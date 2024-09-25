import { redirect } from "next/navigation";
import { Suspense } from "react";

import PokemonList from "@/components/pokemon-list";

import { auth } from "@/auth";
import SearchInput from "@/components/search-input";
import { LoaderCircle } from "lucide-react";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    offset?: string;
  };
}) {
  const session = await auth();
  if (!session) redirect("/");

  const q = searchParams?.q || "";
  const offset = Number(searchParams?.offset) || 1;

  return (
    <main className="flex flex-col justify-between h-screen mx-auto w-full">
      <header className="h-12 w-full p-1">
        <SearchInput />
      </header>
      <Suspense
        key={offset + q}
        fallback={<LoaderCircle className="h-12  animate-spin grow w-full" />}
      >
        <PokemonList offset={offset} q={q} />
      </Suspense>
    </main>
  );
}
