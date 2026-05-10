import { Link, Route, Routes } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowRight,
  Boxes,
  Cloud,
  Code2,
  Github,
  Layers3,
  PackageCheck,
  Palette,
  RefreshCw,
  RouteIcon,
  Sparkles,
  Terminal,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTemplateStore } from "@/stores/template-store";

const stackItems = [
  { icon: Code2, label: "Vite + React 19", detail: "Fast SPA workflow" },
  { icon: Palette, label: "Tailwind CSS v4", detail: "Token-based styling" },
  { icon: Boxes, label: "shadcn/ui", detail: "Full component set" },
  { icon: RouteIcon, label: "React Router", detail: "Cloudflare SPA fallback" },
  { icon: Layers3, label: "Zustand", detail: "Small persistent store" },
  { icon: Cloud, label: "Cloudflare Pages", detail: "Static-first deploy" },
];

const commands = [
  { label: "Install", value: "npm install" },
  { label: "Develop", value: "npm run dev" },
  { label: "Check", value: "npm run ci:static" },
  { label: "Preview Pages", value: "npm run pages:dev" },
];

/**
 * 应用根路由。
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

/**
 * 模板首页。
 */
function HomePage() {
  const { count, text, increment, setText, reset } = useTemplateStore();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/icon.svg" alt="" className="h-8 w-8" />
            <div>
              <p className="text-sm font-semibold leading-none">
                Vibe Pages Vite
              </p>
              <p className="text-xs text-muted-foreground">
                Cloudflare Pages frontend starter
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/DJChanahCJD/vibe-template-cf"
                target="_blank"
                rel="noreferrer"
                aria-label="Open repository"
              >
                <Github />
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1.35fr_0.65fr]">
        <section className="space-y-6">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Vite SPA</Badge>
              <Badge variant="outline">React Router</Badge>
              <Badge variant="outline">Cloudflare Pages</Badge>
            </div>
            <div className="max-w-3xl space-y-4">
              <h1 className="text-3xl font-bold tracking-normal sm:text-5xl">
                A clean frontend base for fast Cloudflare Pages apps.
              </h1>
              <p className="text-base leading-7 text-muted-foreground sm:text-lg">
                Ship a static React app with Tailwind CSS, shadcn/ui, routing,
                theme switching, toasts, and a small persistent store already
                wired together.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => toast.success("Frontend stack is ready")}>
                Try toast
                <Sparkles />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stackItems.map((item) => (
              <Card key={item.label}>
                <CardHeader>
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <CardTitle>{item.label}</CardTitle>
                  <CardDescription>{item.detail}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <Card id="commands">
            <CardHeader>
              <CardTitle>Commands</CardTitle>
              <CardDescription>
                Root-level scripts for daily work.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="commands">
                <TabsList className="w-full">
                  <TabsTrigger value="commands">CLI</TabsTrigger>
                  <TabsTrigger value="store">Store</TabsTrigger>
                </TabsList>
                <TabsContent value="commands" className="mt-4 space-y-3">
                  {commands.map((command) => (
                    <div
                      key={command.label}
                      className="rounded-md border bg-muted/30 p-3"
                    >
                      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Terminal className="h-3.5 w-3.5" />
                        {command.label}
                      </div>
                      <code className="break-all text-sm">{command.value}</code>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="store" className="mt-4 space-y-4">
                  <div className="rounded-md border bg-muted/30 p-4">
                    <p className="text-sm text-muted-foreground">
                      Persistent counter
                    </p>
                    <p className="mt-2 text-3xl font-semibold">{count}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={increment} className="flex-1">
                      Increment
                    </Button>
                    <Button variant="outline" onClick={reset} size="icon">
                      <RefreshCw />
                    </Button>
                  </div>
                  <input
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Persisted note"
                    className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none ring-offset-background transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                <PackageCheck className="h-4 w-4" />
              </div>
              <CardTitle>Deploy shape</CardTitle>
              <CardDescription>
                Build command is npm run build. Output directory is dist.
              </CardDescription>
            </CardHeader>
          </Card>
        </aside>
      </main>
    </div>
  );
}
