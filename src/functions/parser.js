import Link from "next/link";
import parse, { domToReact } from "html-react-parser";

export default function parseHtml(html, opt, size) {
  const options = {
    replace: ({ name, attribs, children }) => {
      if (name === "a") {
        return (
          <Link href={attribs.href} rel={attribs.target === "_blank" ? "noopener noreferrer" : ""} target={attribs.target === "_blank" ? "_blank" : ""}>
            <strong>
              <span className='article-link'>{domToReact(children, options)}</span>
            </strong>
          </Link>
        );
      }
    },
  };

  return parse(html, options);
}
