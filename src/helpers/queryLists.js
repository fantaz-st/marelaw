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
    posts(first: 6) {
      nodes {
        id
        date
        title
        uri
        excerpt
        categories {
          nodes {
            name
            slug
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

export const newsQuery = ({ numberOfPosts = 10, search = "", endCursor = "", month = null, year = null, category = "" }) => {
  return `query MyQuery {
    categories(first: 10) {
      nodes {
        count
        slug
        name
      }
    }
    category: categories(where: { slug: "${category}" }) {
      nodes {
        name
        slug
      }
    }
    posts(
      first: ${numberOfPosts}
      after: "${endCursor}"
      where: {
        search: "${search}"
        categoryName: "${category === "Erasmus+" ? "Erasmus" : category}"
        dateQuery: { month: ${month}, year: ${year} }
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        link
        slug
        date
        excerpt
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            firstName
            lastName
            id
            avatar {
              url
            }
          }
        }
      }
    }
  }
  `;
};
