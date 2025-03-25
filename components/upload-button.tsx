"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface UploadButtonProps {
  id: string
  label: string
  onChange: (file: File | null) => void
}

export function UploadButton({ id, label, onChange }: UploadButtonProps) {
  const [fileName, setFileName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setFileName(file.name)
      onChange(file)
    } else {
      setFileName(null)
      onChange(null)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button type="button" variant="outline" onClick={handleClick} className="w-full">
        <Upload className="mr-2 h-4 w-4" />
        {label}
      </Button>
      <input id={id} type="file" ref={inputRef} onChange={handleFileChange} className="hidden" />
      {fileName && <p className="text-sm text-muted-foreground mt-1">Arquivo selecionado: {fileName}</p>}
    </div>
  )
}

