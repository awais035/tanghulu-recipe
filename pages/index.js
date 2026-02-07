import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import Link from 'next/link';
import { getAllPosts, getFeaturedPosts, getPageBySlug } from '../lib/wordpress';

export default function Home({ posts, homePage }) {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            {/* Hero Text */}
            <div className="hero-text">
              <span className="hero-badge">
                🍬 Traditional Chinese Treat
              </span>
              <h1>
                Perfect <span>Tanghulu</span> Recipe
              </h1>
              <p className="hero-description">
                Master the art of making Tanghulu - beautiful candied fruit on a stick! 
                Crystal-clear sugar coating, fresh fruit inside. A centuries-old Chinese 
                street food you can now make at home.
              </p>
              
              {/* Recipe Stats */}
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-icon">⏱️</div>
                  <div className="hero-stat-value">30-40</div>
                  <div className="hero-stat-label">Minutes</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-icon">🔥</div>
                  <div className="hero-stat-value">645</div>
                  <div className="hero-stat-label">Calories</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-icon">👨‍🍳</div>
                  <div className="hero-stat-value">Easy</div>
                  <div className="hero-stat-label">Level</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="hero-buttons">
                <Link href="#recipe" className="btn btn-primary">
                  🍡 Start Making
                </Link>
                <Link href="/blog" className="btn btn-secondary">
                  View All Recipes
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hero-image">
              <div className="hero-image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=800&q=80" 
                  alt="Delicious Tanghulu candied fruit"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="placeholder-image">🍡</div>';
                  }}
                />
                <div className="hero-image-badge">
                  <span>✨ Glossy & Crunchy!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Info Cards */}
      <section className="recipe-info-section">
        <div className="container">
          <div className="recipe-info-grid">
            <div className="recipe-info-card">
              <div className="recipe-info-icon">🍓</div>
              <div className="recipe-info-value">4</div>
              <div className="recipe-info-label">Ingredients</div>
            </div>
            <div className="recipe-info-card">
              <div className="recipe-info-icon">⏰</div>
              <div className="recipe-info-value">10 min</div>
              <div className="recipe-info-label">Prep Time</div>
            </div>
            <div className="recipe-info-card">
              <div className="recipe-info-icon">🍳</div>
              <div className="recipe-info-value">20 min</div>
              <div className="recipe-info-label">Cook Time</div>
            </div>
            <div className="recipe-info-card">
              <div className="recipe-info-icon">🍽️</div>
              <div className="recipe-info-value">8</div>
              <div className="recipe-info-label">Servings</div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Tanghulu Section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">📜 History</span>
            <h2 className="section-title">What is Tanghulu?</h2>
            <p className="section-description">
              Tanghulu (糖葫芦) is a traditional Chinese snack dating back to the Song Dynasty. 
              Fresh fruits are skewered on bamboo sticks and coated with a crispy, glass-like 
              sugar shell.
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏛️</div>
              <h4 style={{ marginBottom: '0.5rem' }}>Ancient Origins</h4>
              <p style={{ margin: 0, fontSize: '0.9375rem' }}>
                Originated during the Song Dynasty (960-1279 AD) as a medicinal treat
              </p>
            </div>
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍎</div>
              <h4 style={{ marginBottom: '0.5rem' }}>Traditional Fruit</h4>
              <p style={{ margin: 0, fontSize: '0.9375rem' }}>
                Originally made with hawthorn berries, now with strawberries, grapes & more
              </p>
            </div>
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
              <h4 style={{ marginBottom: '0.5rem' }}>Perfect Coating</h4>
              <p style={{ margin: 0, fontSize: '0.9375rem' }}>
                Crystal-clear sugar shell that cracks when you bite into it
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Steps Section */}
      <section className="section steps-section" id="recipe">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">👨‍🍳 Instructions</span>
            <h2 className="section-title">3 Simple Steps</h2>
            <p className="section-description">
              Follow these easy steps to make perfect Tanghulu every time. 
              No special equipment needed!
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <span className="step-number">1</span>
              <div className="step-icon">🍓</div>
              <h3>Prepare the Fruit</h3>
              <p>
                Wash and dry your fruits completely. Any moisture will prevent the sugar 
                from sticking. Skewer 3-4 fruits on bamboo sticks.
              </p>
            </div>
            <div className="step-card">
              <span className="step-number">2</span>
              <div className="step-icon">🍯</div>
              <h3>Make Sugar Syrup</h3>
              <p>
                Combine 2 cups sugar and 1 cup water. Heat to 300°F (150°C) - the hard crack 
                stage. Don't stir once it starts boiling!
              </p>
            </div>
            <div className="step-card">
              <span className="step-number">3</span>
              <div className="step-icon">✨</div>
              <h3>Coat the Fruit</h3>
              <p>
                Quickly dip fruit skewers in hot syrup, rotate to coat evenly. Place on 
                parchment paper to cool. Sugar hardens in seconds!
              </p>
            </div>
          </div>

          {/* Pro Tips */}
          <div style={{
            maxWidth: '700px',
            margin: '3rem auto 0',
            background: 'linear-gradient(135deg, var(--accent-cream) 0%, #fff 100%)',
            border: '2px solid var(--secondary)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem'
          }}>
            <h4 style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              color: 'var(--secondary-dark)',
              marginBottom: '1rem'
            }}>
              💡 Pro Tips
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Speed is key!</strong> Work quickly once sugar is ready - it hardens fast
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Use a thermometer</strong> for best results, or test with cold water
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Experiment with flavors</strong> - add food coloring or extracts to syrup
              </li>
              <li>
                <strong>Eat same day</strong> - humidity makes the coating sticky over time
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Blog/Guides Section */}
      <section className="section guides-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">📚 Guides</span>
            <h2 className="section-title">Related Recipes & Tips</h2>
            <p className="section-description">
              Explore more Tanghulu variations, techniques, and helpful guides
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="guides-grid">
              {posts.slice(0, 6).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="no-posts">
              <h3>Recipes coming soon!</h3>
              <p>We're preparing delicious content for you.</p>
            </div>
          )}

          {posts.length > 6 && (
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/blog" className="btn btn-secondary">
                View All Guides →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>🍡 Get Sweet Updates!</h2>
            <p>
              Subscribe for new recipes, tips, and Tanghulu inspiration 
              delivered to your inbox.
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const [posts, homePage] = await Promise.all([
      getAllPosts(10),
      getPageBySlug('home').catch(() => null),
    ]);

    return {
      props: {
        posts: posts || [],
        homePage: homePage || null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return {
      props: {
        posts: [],
        homePage: null,
      },
      revalidate: 60,
    };
  }
}
