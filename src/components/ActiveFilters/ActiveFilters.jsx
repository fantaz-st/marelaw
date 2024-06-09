"use client";

import { Box, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useRouter } from "next/navigation";

const ActiveFilters = ({ searchParams, categoryMap }) => {
  const router = useRouter();

  const handleRemoveFilter = (filterType, filterValue) => {
    let newSearchString = "";

    if (filterType === "category") {
      // Clear the category parameter
      newSearchString = searchParams.search ? `search=${encodeURIComponent(searchParams.search)}` : "";
    } else if (filterType === "search") {
      // If removing a search term, samo napravi search string bez search parametra
      const category = searchParams.category;
      newSearchString = category ? `category=${encodeURIComponent(category)}` : "";
    }

    router.push(`/articles?${newSearchString}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {(searchParams.category || searchParams.search) && <Typography variant='h5'>Active filters</Typography>}

      {searchParams.category && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant='p'>{categoryMap[searchParams.category]}</Typography>
          <CloseRoundedIcon onClick={() => handleRemoveFilter("category", searchParams.category)} style={{ cursor: "pointer" }} />
        </Box>
      )}
      {searchParams.search && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant='p'>{searchParams.search}</Typography>
          <CloseRoundedIcon onClick={() => handleRemoveFilter("search", searchParams.search)} style={{ cursor: "pointer" }} />
        </Box>
      )}
    </Box>
  );
};

export default ActiveFilters;
