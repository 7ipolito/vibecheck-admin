"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { createSimplePost } from "@/lib/actions/post.action";
import { UploadButton } from "@/utils/uploadthing";

export default function CadastrarEvento() {
  const [titulo, setTitulo] = useState("");
  const [imagemUrl, setImagemUrl] = useState<string | null>(null);

  const handleImageUploadComplete = (res: any) => {
    setImagemUrl(res[0].ufsUrl); // Supondo que `fileUrl` é a chave correta
    console.log("Imagem carregada:", res);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imagemUrl) {
      return;
    }

    try {
      const userData = {
        name: titulo,
        image: imagemUrl,
      };
      const response = await createSimplePost(userData);
      console.log("Resposta da API:", response);
    } catch (error) {
      console.error("Erro ao cadastrar evento:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Cadastrar evento</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {!imagemUrl && (
              <div className="flex flex-col gap-2 items-center">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={handleImageUploadComplete}
                  onUploadError={(error: Error) => {
                    console.error("Erro no upload:", error);
                  }}
                />
              </div>
            )}

            {imagemUrl && (
              <div className="flex flex-col items-center">
                <Label>Pré-visualização do banner:</Label>
                <img
                  src={imagemUrl}
                  alt="Imagem do evento"
                  className="w-full h-auto max-w-xs rounded-lg shadow-md mt-2"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="titulo">Título</Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título do evento"
                required
              />
            </div>

            <div className="flex gap-2 justify-end mt-4">
              <Link href="/">
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
