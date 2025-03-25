import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center flex flex-col items-center">
          <CardTitle className="text-2xl">VibeCheck ADMIN</CardTitle>
          <img
            src="/vibecheck.webp"
            alt="VibeCheck"
            style={{ width: 100 }}
            className="mx-auto"
          />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link href="/cadastrar-evento" className="w-full">
            <Button className="w-full" variant="outline">
              Cadastrar evento
            </Button>
          </Link>
          <Link href="/cadastrar-ticket" className="w-full">
            <Button className="w-full" variant="outline">
              Cadastrar ticket
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
