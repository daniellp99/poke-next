import { PASSWORD, USERNAME } from "@/constants";
import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "username is required" })
    .trim()
    .refine((val) => val === USERNAME, {
      message: "Hey, you're not the best pokemon trainer. Try again.",
    }),
  password: z
    .string()
    .min(1, { message: "password is required" })
    .trim()
    .refine((val) => val === PASSWORD, {
      message: "Remember your favorite pokemon.",
    }),
});

export const paginatedPokemonListSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(z.object({ name: z.string(), url: z.string() })),
});

export type PaginatedPokemonList = z.infer<typeof paginatedPokemonListSchema>;

export const pokemonDetailSchema = z.object({
  height: z.number(),
  id: z.number(),
  name: z.string(),
  sprites: z.object({
    back_default: z.string(),
    back_female: z.null(),
    back_shiny: z.string(),
    back_shiny_female: z.null(),
    front_default: z.string(),
    front_female: z.null(),
    front_shiny: z.string(),
    front_shiny_female: z.null(),
    other: z.object({
      dream_world: z.object({
        front_default: z.string(),
        front_female: z.null(),
      }),
      home: z.object({
        front_default: z.string(),
        front_female: z.null(),
        front_shiny: z.string(),
        front_shiny_female: z.null(),
      }),
      "official-artwork": z.object({
        front_default: z.string(),
        front_shiny: z.string(),
      }),
      showdown: z.object({
        back_default: z.string(),
        back_female: z.null(),
        back_shiny: z.string(),
        back_shiny_female: z.null(),
        front_default: z.string(),
        front_female: z.null(),
        front_shiny: z.string(),
        front_shiny_female: z.null(),
      }),
    }),
    versions: z.object({
      "generation-i": z.object({
        "red-blue": z.object({
          back_default: z.string(),
          back_gray: z.string(),
          back_transparent: z.string(),
          front_default: z.string(),
          front_gray: z.string(),
          front_transparent: z.string(),
        }),
        yellow: z.object({
          back_default: z.string(),
          back_gray: z.string(),
          back_transparent: z.string(),
          front_default: z.string(),
          front_gray: z.string(),
          front_transparent: z.string(),
        }),
      }),
      "generation-ii": z.object({
        crystal: z.object({
          back_default: z.string(),
          back_shiny: z.string(),
          back_shiny_transparent: z.string(),
          back_transparent: z.string(),
          front_default: z.string(),
          front_shiny: z.string(),
          front_shiny_transparent: z.string(),
          front_transparent: z.string(),
        }),
        gold: z.object({
          back_default: z.string(),
          back_shiny: z.string(),
          front_default: z.string(),
          front_shiny: z.string(),
          front_transparent: z.string(),
        }),
        silver: z.object({
          back_default: z.string(),
          back_shiny: z.string(),
          front_default: z.string(),
          front_shiny: z.string(),
          front_transparent: z.string(),
        }),
      }),
      "generation-iii": z.object({
        emerald: z.object({
          front_default: z.string(),
          front_shiny: z.string(),
        }),
        "firered-leafgreen": z.object({
          back_default: z.string(),
          back_shiny: z.string(),
          front_default: z.string(),
          front_shiny: z.string(),
        }),
        "ruby-sapphire": z.object({
          back_default: z.string(),
          back_shiny: z.string(),
          front_default: z.string(),
          front_shiny: z.string(),
        }),
      }),
      "generation-iv": z.object({
        "diamond-pearl": z.object({
          back_default: z.string(),
          back_female: z.null(),
          back_shiny: z.string(),
          back_shiny_female: z.null(),
          front_default: z.string(),
          front_female: z.null(),
          front_shiny: z.string(),
          front_shiny_female: z.null(),
        }),
        "heartgold-soulsilver": z.object({
          back_default: z.string(),
          back_female: z.null(),
          back_shiny: z.string(),
          back_shiny_female: z.null(),
          front_default: z.string(),
          front_female: z.null(),
          front_shiny: z.string(),
          front_shiny_female: z.null(),
        }),
        platinum: z.object({
          back_default: z.string(),
          back_female: z.null(),
          back_shiny: z.string(),
          back_shiny_female: z.null(),
          front_default: z.string(),
          front_female: z.null(),
          front_shiny: z.string(),
          front_shiny_female: z.null(),
        }),
      }),
      "generation-v": z.object({
        "black-white": z.object({
          animated: z.object({
            back_default: z.string(),
            back_female: z.null(),
            back_shiny: z.string(),
            back_shiny_female: z.null(),
            front_default: z.string(),
            front_female: z.null(),
            front_shiny: z.string(),
            front_shiny_female: z.null(),
          }),
          back_default: z.string(),
          back_female: z.null(),
          back_shiny: z.string(),
          back_shiny_female: z.null(),
          front_default: z.string(),
          front_female: z.null(),
          front_shiny: z.string(),
          front_shiny_female: z.null(),
        }),
      }),
      "generation-vi": z.object({
        "omegaruby-alphasapphire": z.object({
          front_default: z.string(),
          front_female: z.null(),
          front_shiny: z.string(),
          front_shiny_female: z.null(),
        }),
        "x-y": z.object({
          front_default: z.string(),
          front_female: z.null(),
          front_shiny: z.string(),
          front_shiny_female: z.null(),
        }),
      }),
      "generation-vii": z.object({
        icons: z.object({ front_default: z.string(), front_female: z.null() }),
        "ultra-sun-ultra-moon": z.object({
          front_default: z.string(),
          front_female: z.null(),
          front_shiny: z.string(),
          front_shiny_female: z.null(),
        }),
      }),
      "generation-viii": z.object({
        icons: z.object({ front_default: z.string(), front_female: z.null() }),
      }),
    }),
  }),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      effort: z.number(),
      stat: z.object({ name: z.string(), url: z.string() }),
    })
  ),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({ name: z.string(), url: z.string() }),
    })
  ),
  weight: z.number(),
});

export type PokemonDetail = z.infer<typeof pokemonDetailSchema>;
