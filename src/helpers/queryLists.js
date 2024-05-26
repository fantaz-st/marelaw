export const pagesMenuQuery = `query NewQuery {
  menu(id: "main", idType: NAME) {
    menuItems(first:100) {
      nodes {
        databaseId
        parentDatabaseId
        label
        uri
      }
    }
  }
}`;

export const allPagesUrisQuery = `query GET_PAGES {
  pages {
      nodes {
        id
        title
        uri
      }
  }
}
`;

export const allNewsQuery = `query NewQuery {
    posts(first: 4) {
      nodes {
        id
        date
        title
        uri
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            slug
          }
        }
        featuredImage {
          node {
            altText
            caption
            sourceUrl
          }
        }
      }
    }
  }`;

export const singlePageContent = (id) => {
  return `query MyQuery {
        page(id: "${id}", idType: URI) {
           title
           modified
           content
           blocks
           featuredImage {
            node {
              sourceUrl
            }
          }
          ancestors {
            nodes {
              ... on Page {
                id
                uri
                title
              }
            }
          }
           children {
            nodes{
              id
            uri
            ... on Page {
              title
            }
            }
           }
         }
        }`;
};

export const singlePostPageQuery = (slug) => {
  return `query postData {
    categories {
      nodes {
        count
        slug
        name
      }
    }
      post(id: "${slug}", idType: SLUG) {
        author {
          node {
            firstName
            lastName
            id
            name
            avatar {
              url
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        date
        id
        title
        blocks
        featuredImage {
          node {
            mediaDetails {
              width
              height
            }
            sourceUrl
            title
          }
        }
      }
  }`;
};
