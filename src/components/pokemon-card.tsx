import {
  HeartIcon,
  PieChartIcon,
  RulerIcon,
  ShieldIcon,
  ShieldPlusIcon,
  SwordIcon,
  SwordsIcon,
  WeightIcon,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { pokemonDetailSchema } from "@/lib/schemas";
import PokemonCardEmpty from "./pokemon-card-empty";

function StatIcon(statName: string) {
  switch (statName) {
    case "hp":
      return <HeartIcon className="size-6 fill-red-300 stroke-red-300" />;

    case "attack":
      return <SwordIcon className="size-6 fill-gray-300 stroke-gray-300" />;

    case "defense":
      return <ShieldIcon className="size-6 fill-green-300 stroke-green-300" />;

    case "special-attack":
      return <SwordsIcon className="size-6 fill-gray-600 stroke-gray-600" />;

    case "special-defense":
      return (
        <ShieldPlusIcon className="size-6 fill-lime-300 stroke-lime-900" />
      );

    case "speed":
      return <ZapIcon className="size-6 fill-yellow-300 stroke-yellow-300" />;

    default:
      return <PieChartIcon className="size-6 " />;
  }
}

async function getPokemonDetails(url: string) {
  try {
    const res = await fetch(url, { next: { tags: [url] } });
    const parsedResponse = await pokemonDetailSchema.safeParseAsync(
      await res.json()
    );
    if (!parsedResponse.success) {
      return null;
    }
    return parsedResponse.data;
  } catch (error) {
    if (error) return null;
  }
}

export default async function PokemonCard({ url }: { url: string }) {
  const pokemon = await getPokemonDetails(url);

  if (!pokemon) {
    return <PokemonCardEmpty url={url} />;
  }
  return (
    <Card className="h-64 shadow-md relative transition-all hover:scale-105">
      <Badge variant="outline" className="w-fit absolute right-4 top-4">
        id: <span className="font-bold pl-0.5">{pokemon.id}</span>
      </Badge>
      <CardContent className="relative px-4 py-0">
        <figure className="flex flex-col justify-center">
          <Image
            className="mx-auto"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={128}
            height={128}
          />
          <figcaption className="text-center text-2xl font-bold capitalize">
            {pokemon.name}
          </figcaption>
        </figure>
        <div className="absolute right-4 bottom-8 text-muted-foreground">
          <span className="flex gap-1 text-sm items-center">
            <RulerIcon className="size-5" />
            <span className="font-semibold">{pokemon.height}m</span>
          </span>
          <span className="flex gap-1 text-sm items-center">
            <WeightIcon className="size-5" />
            <span className="font-semibold">{pokemon.weight}kg</span>
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex p-4">
        <ul className="flex gap-2 justify-around w-full">
          {pokemon.stats.map((item) => (
            <li key={item.stat.name}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col gap-0 items-center">
                      <span>{item.base_stat}</span>
                      {StatIcon(item.stat.name)}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="capitalize">
                      {item.stat.name.replace("-", " ")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
}
