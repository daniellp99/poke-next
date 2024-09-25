"use client";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import { refreshPokemon } from "@/app/actions/pokemon";

export default function PokemonCardEmpty({ url }: { url: string }) {
  return (
    <Card className="h-64 w-full flex shadow-md transition-all hover:scale-105 items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        className="size-32 rounded-full"
        onClick={async () => await refreshPokemon(url)}
      >
        <Image src="/pokeball.svg" alt="pokeball" width={128} height={128} />
      </Button>
    </Card>
  );
}
