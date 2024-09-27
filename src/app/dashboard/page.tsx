import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import PokemonList from "@/components/pokemon-list";
import SearchInput from "@/components/search-input";
import UserDropdown from "@/components/user-dropdown";

import { auth } from "@/auth";

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
  const offset = Number(searchParams?.offset) || 0;

  return (
    <main className="flex flex-col justify-between h-screen mx-auto w-full">
      <header className="h-12 max-w-xl w-full p-1 flex gap-1 mx-auto">
        <SearchInput />
        <UserDropdown session={session} />
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
