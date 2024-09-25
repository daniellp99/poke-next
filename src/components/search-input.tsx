"use client";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";

import { PAGINATION_LIMIT } from "@/constants";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("offset", "0");
    params.set("limit", PAGINATION_LIMIT.toString());
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder="Search..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("q")?.toString()}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
