import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">

      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        </div>

        <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight lg:text-7xl">
              Ship <span className="text-primary">Faster</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-lg mx-auto leading-relaxed">
              The modern full-stack template for Cloudflare Pages.
              <br />
              Next.js 16 · Tailwind v4 · Hono · Type-safe
            </p>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
