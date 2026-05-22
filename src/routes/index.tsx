import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Droplets, MessageSquare, ShieldCheck, BarChart3 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard" });
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-gradient-soft">
      <header className="container mx-auto flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-hero shadow-elegant">
            <Droplets className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">WaterCare AI</span>
        </div>
        <Link to="/auth">
          <Button>Sign in</Button>
        </Link>
      </header>

      <main className="container mx-auto px-6 pb-20 pt-12">
        <section className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-primary shadow-card">
            <span className="h-2 w-2 rounded-full bg-primary" /> SDG 6 · Clean Water & Sanitation
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
            Clean water,{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">smarter response.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Report water issues in your area, chat with an AI assistant for guidance,
            and help your community access safe water and sanitation.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-hero shadow-elegant">Get started</Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline">Learn more</Button>
            </a>
          </div>
        </section>

        <section id="features" className="mx-auto mt-24 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            { icon: MessageSquare, title: "AI Assistant", text: "Get instant answers on water safety, conservation, and sanitation." },
            { icon: ShieldCheck, title: "Report Issues", text: "Submit complaints with urgency and track their resolution status." },
            { icon: BarChart3, title: "Coordinated Response", text: "Admins assign and field clients resolve issues with full transparency." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-card transition hover:shadow-elegant">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
