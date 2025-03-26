"use client";

import React, { useState, useEffect } from "react";
import { gql, useApolloClient } from "@apollo/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadButton } from "@/utils/uploadthing";
import client from "@/lib/client";
import { GET_POSTS } from "@/graphql/queries";
import { createTicket } from "@/lib/actions/ticket.action";
import { type } from "os";

const CREATE_TICKET_MUTATION = gql`
  mutation CreateTicket($input: CreateTicketDto!) {
    createTicket(input: $input) {
      id
      eventId
      type
      price
      bucketUrl
    }
  }
`;

export default function CadastrarTicket() {
  const [eventoSelecionado, setEventoSelecionado] = useState("");
  const [tipo, setTipo] = useState("");
  const [preco, setPreco] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [posts, setPosts] = useState<[]>([]); // Você pode criar uma interface/types para o tipo Post
  const [imagemUrl, setImagemUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await client.query({
          query: GET_POSTS,
        });
        console.log(data);
        setPosts(data.posts);
      } catch (err) {
        console.error("Erro ao buscar posts:", err);
      }
    };

    fetchPosts();
  }, [client]);

  const handleFileComplete = (res: any) => {
    setImagemUrl(res[0].ufsUrl);
    console.log("Imagem carregada:", res);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventoSelecionado || !tipo || !preco || !imagemUrl) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await createTicket({
        bucketUrl: imagemUrl!,
        eventID: eventoSelecionado,
        price: Number(preco),
        type: tipo,
      });
      console.log("Resposta da API:", response);

      alert("Ticket cadastrado com sucesso!");
    } catch (err) {
      console.error("Erro ao criar o ticket:", err);
      setError(err as Error);
      alert("Erro ao cadastrar o ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Cadastrar tickets</CardTitle>
        </CardHeader>
        <CardContent>
          {!imagemUrl && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 items-center">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={handleFileComplete}
                  onUploadError={(error: Error) => {
                    console.error("Erro no upload:", error);
                  }}
                />
              </div>
            </form>
          )}

          {imagemUrl && (
            <div className="flex flex-col items-center">
              <Label>Pré-visualização do ticket:</Label>
              <img
                src={imagemUrl}
                alt="Imagem do evento"
                className="w-full h-auto max-w-xs rounded-lg shadow-md mt-2"
              />
            </div>
          )}

          <div className="flex flex-col gap-2 pb-2 mt-2 mb-2">
            <Label htmlFor="evento">Evento</Label>
            <Select
              value={eventoSelecionado}
              onValueChange={setEventoSelecionado}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um evento" />
              </SelectTrigger>
              <SelectContent>
                {posts.map((post) => (
                  <SelectItem key={post._id} value={post._id}>
                    {post.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 mb-2">
            <Label htmlFor="tipo">Tipo de Ticket</Label>
            <input
              id="tipo"
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="border rounded p-2"
              placeholder="Ex: VIP, Geral"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="preco">Preço</Label>
            <input
              id="preco"
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="border rounded p-2"
              placeholder="Ex: 100.00"
            />
          </div>

          <div className="flex justify-center mt-4">
            <Button type="submit" disabled={loading} onClick={handleSubmit}>
              {loading ? "Enviando..." : "Enviar"}
            </Button>
          </div>

          {error && <p className="text-red-500">Erro: {error.message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
