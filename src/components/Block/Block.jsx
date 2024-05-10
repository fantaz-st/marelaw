import React from "react";
import ButtonBlock from "@/elements/BlockElements/ButtonBlock/ButtonBlock";
import ColumnsBlock from "@/elements/BlockElements/ColumnsBlock/ColumnsBlock";
// import FilesBlock from "@/elements/BlockElements/FilesBlock/FilesBlock";
// import GalleryBlock from "@/elements/BlockElements/GalleryBlock/GalleryBlock";
import GroupBlock from "@/elements/BlockElements/GroupBlock/GroupBlock";
import HeadingBlock from "@/elements/BlockElements/HeadingBlock/HeadingBlock";
import ImageBlock from "@/elements/BlockElements/ImageBlock/ImageBlock";
import ListBlock from "@/elements/BlockElements/ListBlock/ListBlock";
import ListItemBlock from "@/elements/BlockElements/ListItemBlock/ListItemBlock";
import ParagraphBlock from "@/elements/BlockElements/ParagraphBlock/ParagraphBlock";
import TableBlock from "@/elements/BlockElements/TableBlock/TableBlock";
import AccordionBlock from "@/elements/BlockElements/AccordionBlock/AccordionBlock";

const Block = ({ block, size }) => {
  const { attributes, name, innerBlocks } = block;
  switch (name) {
    case "core/columns":
      return <ColumnsBlock innerBlocks={innerBlocks} />;
    case "core/heading":
      return <HeadingBlock {...attributes} />;
    case "core/paragraph":
      return <ParagraphBlock {...attributes} />;
    /* case "core/file":
      return <FilesBlock {...attributes} />; */
    case "core/list":
      return <ListBlock {...attributes} innerBlocks={innerBlocks} />;
    case "core/list-item":
      return <ListItemBlock {...attributes} size={size} />;
    case "core/image":
      return <ImageBlock {...attributes} />;
    /* case "core/gallery":
      return <GalleryBlock {...attributes} slike={innerBlocks} />; */
    case "core/table":
      return <TableBlock {...attributes} />;
    case "core/buttons":
      return <ButtonBlock {...innerBlocks[0].attributes} />;
    case "core/group":
      if (attributes?.className === "accordion") return <AccordionBlock {...attributes} components={innerBlocks} />;
      else return <GroupBlock innerBlocks={innerBlocks} />;
    default:
      return null;
  }
};

export default Block;
