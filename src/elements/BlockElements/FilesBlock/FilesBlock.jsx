import DocumentLink from "../../DocumentLink/DocumentLink";

const FilesBlock = ({ name, fileId, fileName, href }) => {
  /* const themeCtx = useContext(ThemeContext);

  const { fontSize } = themeCtx; */

  return (
    <DocumentLink link={href} /* size={fontSize} */ variant='body2article'>
      {fileName}
    </DocumentLink>
  );
};

export default FilesBlock;
