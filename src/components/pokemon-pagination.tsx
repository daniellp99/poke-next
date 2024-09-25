"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import { PAGINATION_LIMIT } from "@/constants";
import { PaginatedPokemonList } from "@/lib/schemas";

export default function PokemonPagination({
  previous,
  next,
}: Omit<PaginatedPokemonList, "results | count">) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentOffset = Number(searchParams.get("offset")) || 0;

  const createPageURL = (offset: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("offset", offset.toString());
    params.set("limit", PAGINATION_LIMIT.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <Pagination className="h-12">
      <PaginationContent>
        {previous && (
          <PaginationItem>
            <PaginationLink
              href={createPageURL(currentOffset - PAGINATION_LIMIT)}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          {Math.ceil(currentOffset / PAGINATION_LIMIT + 1)}
        </PaginationItem>
        {next && (
          <PaginationItem>
            <PaginationLink
              href={createPageURL(currentOffset + PAGINATION_LIMIT)}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
