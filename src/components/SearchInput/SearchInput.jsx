"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "@mui/material";

const SearchInput = ({ searchParams }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("search", searchTerm);

    router.push(`/articles?${newSearchParams.toString()}`);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <TextField
        id='outlined-controlled'
        label='Search'
        inputProps={{
          style: {
            padding: "1.75rem 0.5rem",
          },
        }}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </form>
  );
};

export default SearchInput;
