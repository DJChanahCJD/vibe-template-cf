import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-8 bg-background px-6 text-center">
      <div className="h-16 w-16 text-muted-foreground">
        <img src="/icon.svg" alt="Vibe Logo" className="h-full w-full" />
      </div>

      <h1 className="text-8xl font-bold tracking-tighter text-muted-foreground/20 md:text-9xl">
        404
      </h1>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">页面未找到</h2>
        <p className="mx-auto max-w-xs text-sm text-muted-foreground">
          您访问的页面不存在或已被移除
        </p>
      </div>

      <Button asChild variant="default" size="sm">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回首页
        </Link>
      </Button>
    </main>
  );
}
