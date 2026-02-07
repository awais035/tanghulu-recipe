import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard';
import Link from 'next/link';
import { getPostsByCategory, getCategoryBySlug, getAllCategories } from '../../lib/wordpress';

// Edge Runtime for Cloudflare Pages
export const runtime = 'experimental-edge';

export default function CategoryPage({ category, posts, categories }) {
  if (!category) {
    return (
      <Layout title="Category Not Found">
        <div className="error-page">
          <div className="error-content">
            <h1>404</h1>
            <h2>Category Not Found</h2>
            <p>The category you're looking for doesn't exist.</p>
            <Link href="/blog" className="btn btn-primary">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={category.name}
      description={category.description || `Browse all ${category.name} recipes and guides on Tanghulu Recipe`}
    >
      {/* Category Header */}
      <section className="blog-header">
        <div className="container">
          <span className="section-badge">📂 Category</span>
          <h1>{category.name}</h1>
          {category.description && (
            <p>{category.description}</p>
          )}
          {category.count > 0 && (
            <p style={{ marginTop: '0.5rem', fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
              {category.count} {category.count === 1 ? 'recipe' : 'recipes'}
            </p>
          )}
        </div>
      </section>

      {/* Posts */}
      <section className="blog-section">
        <div className="container">
          {posts.length > 0 ? (
            <div className="guides-grid">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="no-posts">
              <h3>🍡 No recipes yet</h3>
              <p>Check back soon for {category.name} recipes!</p>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/blog" className="btn btn-secondary">
              ← View All Recipes
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const categories = await getAllCategories();
    
    const paths = categories.map((cat) => ({
      params: { slug: cat.slug },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    const [category, posts, categories] = await Promise.all([
      getCategoryBySlug(slug),
      getPostsByCategory(slug, 20),
      getAllCategories(),
    ]);

    if (!category) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        category,
        posts,
        categories,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching category data:', error);
    return {
      notFound: true,
    };
  }
}
