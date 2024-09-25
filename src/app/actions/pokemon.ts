"use server";

import { revalidateTag } from "next/cache";

export async function refreshPokemon(url: string) {
  revalidateTag(url);
}
