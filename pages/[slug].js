import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs, getRelatedPosts, getPageBySlug, getAllPageSlugs } from '../lib/wordpress';
import { formatDate, calculateReadingTime, generateExcerpt } from '../lib/utils';

// Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

export default function SingleContent({ post, relatedPosts, isPage }) {
  if (!post) {
    return (
      <Layout title="Not Found">
        <div className="error-page">
          <div className="error-content">
            <h1>404</h1>
            <h2>Content Not Found</h2>
            <p>The page or recipe you're looking for doesn't exist.</p>
            <Link href="/" className="btn btn-primary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const categories = post.categories?.edges?.map((edge) => edge.node) || [];
  const tags = post.tags?.edges?.map((edge) => edge.node) || [];
  const author = post.author?.node;
  const featuredImage = post.featuredImage?.node;
  const readingTime = calculateReadingTime(post.content || '');

  // Page template
  if (isPage) {
    return (
      <Layout
        title={post.title}
        description={generateExcerpt(post.content)}
        image={featuredImage?.sourceUrl}
      >
        <article className="single-page">
          <div className="container">
            <header className="page-header">
              <h1>{post.title}</h1>
            </header>

            {featuredImage && (
              <div className="post-featured-image">
                <img
                  src={featuredImage.sourceUrl}
                  alt={featuredImage.altText || post.title}
                />
              </div>
            )}

            <div
              className="page-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </Layout>
    );
  }

  // Post template
  return (
    <Layout
      title={post.title}
      description={post.excerpt ? generateExcerpt(post.excerpt) : generateExcerpt(post.content)}
      image={featuredImage?.sourceUrl}
    >
      <article className="single-post">
        <div className="container">
          {/* Post Header */}
          <header className="post-header">
            {categories.length > 0 && (
              <Link href={`/category/${categories[0].slug}`} className="post-header-category">
                {categories[0].name}
              </Link>
            )}

            <h1>{post.title}</h1>

            <div className="post-header-meta">
              {post.date && (
                <span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {formatDate(post.date)}
                </span>
              )}
              <span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                {readingTime} min read
              </span>
            </div>
          </header>

          {/* Featured Image */}
          {featuredImage && (
            <div className="post-featured-image">
              <img
                src={featuredImage.sourceUrl}
                alt={featuredImage.altText || post.title}
              />
            </div>
          )}

          {/* Post Content */}
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border-light)'
            }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600, marginRight: '0.5rem' }}>Tags:</span>
              {tags.map((tag) => (
                <Link 
                  key={tag.slug} 
                  href={`/tag/${tag.slug}`}
                  style={{
                    padding: '0.375rem 1rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* Author Box */}
          {author && (
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              marginTop: '3rem',
              padding: '2rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-xl)',
            }}>
              {author.avatar?.url && (
                <img 
                  src={author.avatar.url} 
                  alt={author.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              )}
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Written by {author.name}</h4>
                <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                  {author.description || 'Sharing delicious Tanghulu recipes and tips to help you make perfect candied fruit at home.'}
                </p>
              </div>
            </div>
          )}

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <section style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-light)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>You Might Also Like</h3>
              <div className="guides-grid">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const [postSlugs, pageSlugs] = await Promise.all([
      getAllPostSlugs(),
      getAllPageSlugs(),
    ]);

    const postPaths = postSlugs.map((slug) => ({
      params: { slug },
    }));

    const pagePaths = pageSlugs.map((slug) => ({
      params: { slug },
    }));

    return {
      paths: [...postPaths, ...pagePaths],
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error fetching slugs:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    // Try to get post first
    let post = await getPostBySlug(slug);
    let isPage = false;
    let relatedPosts = [];

    // If not a post, try to get page
    if (!post) {
      post = await getPageBySlug(slug);
      isPage = true;
    }

    // If still no content, return 404
    if (!post) {
      return {
        notFound: true,
      };
    }

    // Get related posts for blog posts
    if (!isPage && post.categories?.edges?.length > 0) {
      const categorySlug = post.categories.edges[0].node.slug;
      relatedPosts = await getRelatedPosts(categorySlug, slug, 3);
    }

    return {
      props: {
        post,
        relatedPosts,
        isPage,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching content:', error);
    return {
      notFound: true,
    };
  }
}
