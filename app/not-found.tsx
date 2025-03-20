import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-9xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-purple-800 to-pink-700 bg-clip-text">
          404
        </h1>
        <h2 className="text-3xl font-bold tracking-tight text-gray-500">
          Page Not Found
        </h2>
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved, deleted, or never existed.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-transparent border-2 border-purple-800 hover:bg-purple-800 text-white"
        >
          <Link href="/" className="flex items-center gap-2">
            <Home size={18} />
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
