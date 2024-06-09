"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Typography } from "@mui/material";

const CategoryLink = ({ categorySlug, categoryName, searchParams }) => {
  const router = useRouter();

  const createCategoryLink = (categorySlug) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("category", categorySlug);
    return `/articles?${newSearchParams.toString()}`;
  };

  return (
    <Link href={createCategoryLink(categorySlug)}>
      <Typography variant='body'>{categoryName}</Typography>
    </Link>
  );
};

export default CategoryLink;
