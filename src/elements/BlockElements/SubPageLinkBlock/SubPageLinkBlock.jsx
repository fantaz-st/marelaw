import SubPageLink from '../../SubPageLink/SubPageLink';

const SubPageLinkBlock = ({ components }) => {
  const subPage = {
    name: components[0].innerBlocks[0].attributes.text,
    link: components[0].innerBlocks[0].attributes.url,
    description: components[1]?.attributes.content,
  };
  return <SubPageLink subpage={subPage} />;
};

export default SubPageLinkBlock;
