const API_URL = process.env.WORDPRESS_API_URL || 'https://cms.tanghulurecipe.com/graphql';

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

// Get all posts for blog
export async function getAllPosts(first = 20) {
  const data = await fetchAPI(
    `
    query AllPosts($first: Int!) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            title
            slug
            date
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
    `,
    { variables: { first } }
  );

  return data?.posts?.edges?.map((edge) => edge.node) || [];
}

// Get featured/recent posts
export async function getFeaturedPosts(first = 6) {
  const data = await fetchAPI(
    `
    query FeaturedPosts($first: Int!) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            title
            slug
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
    `,
    { variables: { first } }
  );

  return data?.posts?.edges?.map((edge) => edge.node) || [];
}

// Get single post by slug
export async function getPostBySlug(slug) {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        slug
        date
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          edges {
            node {
              name
              slug
            }
          }
        }
        tags {
          edges {
            node {
              name
              slug
            }
          }
        }
        author {
          node {
            name
            description
            avatar {
              url
            }
          }
        }
      }
    }
    `,
    { variables: { slug } }
  );

  return data?.post;
}

// Get all post slugs for static generation
export async function getAllPostSlugs() {
  const data = await fetchAPI(
    `
    query AllPostSlugs {
      posts(first: 1000) {
        edges {
          node {
            slug
          }
        }
      }
    }
    `
  );

  return data?.posts?.edges?.map((edge) => edge.node.slug) || [];
}

// Get single page by slug
export async function getPageBySlug(slug) {
  const data = await fetchAPI(
    `
    query PageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        id
        title
        slug
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    `,
    { variables: { slug } }
  );

  return data?.page;
}

// Get all page slugs for static generation
export async function getAllPageSlugs() {
  const data = await fetchAPI(
    `
    query AllPageSlugs {
      pages(first: 100) {
        edges {
          node {
            slug
          }
        }
      }
    }
    `
  );

  return data?.pages?.edges?.map((edge) => edge.node.slug) || [];
}

// Get posts by category
export async function getPostsByCategory(categorySlug, first = 20) {
  const data = await fetchAPI(
    `
    query PostsByCategory($categorySlug: String!, $first: Int!) {
      posts(first: $first, where: { categoryName: $categorySlug, orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            title
            slug
            date
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
    `,
    { variables: { categorySlug, first } }
  );

  return data?.posts?.edges?.map((edge) => edge.node) || [];
}

// Get all categories
export async function getAllCategories() {
  const data = await fetchAPI(
    `
    query AllCategories {
      categories(first: 100) {
        edges {
          node {
            id
            name
            slug
            count
          }
        }
      }
    }
    `
  );

  return data?.categories?.edges?.map((edge) => edge.node) || [];
}

// Get category by slug
export async function getCategoryBySlug(slug) {
  const data = await fetchAPI(
    `
    query CategoryBySlug($slug: ID!) {
      category(id: $slug, idType: SLUG) {
        id
        name
        slug
        description
        count
      }
    }
    `,
    { variables: { slug } }
  );

  return data?.category;
}

// Search posts
export async function searchPosts(searchTerm, first = 20) {
  const data = await fetchAPI(
    `
    query SearchPosts($searchTerm: String!, $first: Int!) {
      posts(first: $first, where: { search: $searchTerm }) {
        edges {
          node {
            id
            title
            slug
            date
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
    `,
    { variables: { searchTerm, first } }
  );

  return data?.posts?.edges?.map((edge) => edge.node) || [];
}

// Get related posts by category
export async function getRelatedPosts(categorySlug, excludeSlug, first = 3) {
  const data = await fetchAPI(
    `
    query RelatedPosts($categorySlug: String!, $first: Int!) {
      posts(first: $first, where: { categoryName: $categorySlug, orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            title
            slug
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
    `,
    { variables: { categorySlug, first: first + 1 } }
  );

  const posts = data?.posts?.edges?.map((edge) => edge.node) || [];
  return posts.filter((post) => post.slug !== excludeSlug).slice(0, first);
}

// Get homepage content (main page)
export async function getHomePage() {
  const data = await fetchAPI(
    `
    query HomePage {
      page(id: "home", idType: URI) {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    `
  );

  return data?.page;
}

export default {
  getAllPosts,
  getFeaturedPosts,
  getPostBySlug,
  getAllPostSlugs,
  getPageBySlug,
  getAllPageSlugs,
  getPostsByCategory,
  getAllCategories,
  getCategoryBySlug,
  searchPosts,
  getRelatedPosts,
  getHomePage,
};
