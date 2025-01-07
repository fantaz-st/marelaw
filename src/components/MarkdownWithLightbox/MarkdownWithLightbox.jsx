import React from "react";
import ReactMarkdown from "react-markdown";
import Lightbox from "./Lightbox";

const MarkdownWithLightbox = ({ content }) => {
  return (
    <div>
      <div id='gallery'>
        <ReactMarkdown
          components={{
            img: ({ node, ...props }) => (
              <a href={props.src} data-pswp-width='1200' data-pswp-height='800'>
                <img
                  {...props}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    cursor: "pointer",
                  }}
                  alt={props.alt || "Image"}
                />
              </a>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
      <Lightbox />
    </div>
  );
};

export default MarkdownWithLightbox;
