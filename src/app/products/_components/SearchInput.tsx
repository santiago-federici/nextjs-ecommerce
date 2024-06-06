"use client";

import { Search } from "@components/Icons";
import { useRouter } from "next/navigation";

export function SearchInput() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name) {
      router.push(`/products?name=${name}`);
    }

    if (name === "") {
      router.push("/products");
    }
  };

  return (
    <form className="w-96 h-full absolute right-0" onSubmit={handleSearch}>
      <input
        name="name"
        type="text"
        placeholder="Search"
        className="text-base h-full w-full px-2 rounded-md border"
      />
      <span className="text-gray-300 absolute right-4 top-1/2 -translate-y-1/2">
        <Search />
      </span>
    </form>
  );
}
