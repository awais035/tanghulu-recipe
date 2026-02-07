import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { getAllPosts, getAllCategories } from '../lib/wordpress';

export default function BlogPage({ posts, categories }) {
  return (
    <Layout title="Blog" description="Explore all Tanghulu recipes, tips, guides, and variations">
      {/* Blog Header */}
      <section className="blog-header">
        <div className="container">
          <span className="section-badge">📚 All Recipes & Guides</span>
          <h1>Tanghulu Blog</h1>
          <p>
            Discover recipes, techniques, storage tips, and everything you need 
            to master the art of making perfect candied fruit.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
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
              <h3>🍡 Recipes coming soon!</h3>
              <p>We're preparing delicious Tanghulu content for you.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const [posts, categories] = await Promise.all([
      getAllPosts(30),
      getAllCategories(),
    ]);

    return {
      props: {
        posts: posts || [],
        categories: categories || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return {
      props: {
        posts: [],
        categories: [],
      },
      revalidate: 60,
    };
  }
}
