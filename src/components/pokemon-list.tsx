import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";
import { toast } from "sonner";

import PokemonCard from "@/components/pokemon-card";
import PokemonPagination from "@/components/pokemon-pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { PAGINATION_LIMIT } from "@/constants";
import {
  PaginatedPokemonList,
  paginatedPokemonListSchema,
} from "@/lib/schemas";

async function getPaginatedPokemonList(offset: number, q: string) {
  noStore();
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${
        q !== "" ? 1000 : PAGINATION_LIMIT
      }`,
      { next: { tags: [`${offset}${q}`] } }
    );
    const parsedResponse = await paginatedPokemonListSchema.safeParseAsync(
      await res.json()
    );
    if (!parsedResponse.success) {
      toast.error(parsedResponse.error.message);
      return null;
    }
    let filterResult: PaginatedPokemonList["results"] | undefined = [];
    if (q !== "" && parsedResponse.data) {
      filterResult = parsedResponse.data?.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(q.toLowerCase())
      );
      parsedResponse.data.results = filterResult;
    }
    return parsedResponse.data;
  } catch (error) {
    if (error) return null;
  }
}

export default async function PokemonList({
  offset,
  q,
}: {
  offset: number;
  q: string;
}) {
  const paginatedPokemonList = await getPaginatedPokemonList(offset, q);

  return (
    <>
      <ScrollArea>
        <ul className="grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full px-6 pt-4 gap-4">
          {paginatedPokemonList?.results.map((pokemon) => (
            <li key={pokemon.name}>
              <Suspense
                fallback={<Skeleton className="h-64 w-full rounded-lg" />}
              >
                <PokemonCard url={pokemon.url} />
              </Suspense>
            </li>
          ))}
        </ul>
      </ScrollArea>
      {paginatedPokemonList && <PokemonPagination {...paginatedPokemonList} />}
    </>
  );
}
