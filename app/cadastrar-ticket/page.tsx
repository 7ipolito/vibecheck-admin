"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { UploadButton } from "@/components/upload-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CadastrarTicket() {
  const [eventoSelecionado, setEventoSelecionado] = useState("")
  const [ticketSelecionado, setTicketSelecionado] = useState<File | null>(null)

  // Exemplo de lista de eventos
  const eventos = [
    { id: "1", nome: "Show de Rock" },
    { id: "2", nome: "Festival de Verão" },
    { id: "3", nome: "Conferência Tech" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para enviar os dados do ticket
    console.log("Ticket:", { evento: eventoSelecionado, ticket: ticketSelecionado })
    alert("Ticket cadastrado com sucesso!")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Cadastrar tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 items-center">
              <UploadButton id="upload-ticket" label="Upload ticket" onChange={(file) => setTicketSelecionado(file)} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="evento">Evento</Label>
              <Select value={eventoSelecionado} onValueChange={setEventoSelecionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um evento" />
                </SelectTrigger>
                <SelectContent>
                  {eventos.map((evento) => (
                    <SelectItem key={evento.id} value={evento.id}>
                      {evento.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center mt-4">
              <Button type="submit">Enviar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

