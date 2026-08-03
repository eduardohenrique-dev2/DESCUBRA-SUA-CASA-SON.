import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const APP_URL = "/descubra/index.html";

export const Route = createFileRoute()({
  head: () => ({
    meta: [
      { title: "Descubra sua Casa | SON" },
      {
        name: "description",
        content:
          "Deus preparou um lugar onde seus dons podem florescer. Faça a jornada de discernimento e descubra sua Casa no SON.",
      },
      { property: "og:title", content: "Descubra sua Casa | SON" },
      {
        property: "og:description",
        content:
          "Jornada de discernimento no  SON: descubra a Casa onde seus dons podem florescer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace(APP_URL);
  }, []);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-black px-6 text-center">
      <h1 className="font-semibold uppercase tracking-[0.3em] text-white">
        Descubra sua Casa
      </h1>
      <p className="text-sm text-white/60">Abrindo a jornada de discernimento...</p>
      <a
        href={APP_URL}
        className="rounded-full border border-white/20 px-6 py-3 text-sm uppercase tracking-widest text-white"
      >
        Entrar agora
      </a>
    </main>
  );
}
