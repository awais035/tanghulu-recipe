import Link from 'next/link';
import { formatDate, truncateText } from '../lib/utils';

export default function PostCard({ post }) {
  const categories = post.categories?.edges?.map((edge) => edge.node) || [];
  const featuredImage = post.featuredImage?.node;
  const excerpt = truncateText(post.excerpt, 120);

  return (
    <article className="post-card">
      <Link href={`/${post.slug}`}>
        <div className="post-card-image">
          {featuredImage ? (
            <img
              src={featuredImage.sourceUrl}
              alt={featuredImage.altText || post.title}
            />
          ) : (
            <div className="placeholder-image">🍡</div>
          )}
        </div>
      </Link>
      <div className="post-card-body">
        {categories.length > 0 && (
          <Link href={`/category/${categories[0].slug}`} className="post-card-category">
            {categories[0].name}
          </Link>
        )}
        <h3>
          <Link href={`/${post.slug}`}>{post.title}</Link>
        </h3>
        {excerpt && (
          <p className="post-card-excerpt">{excerpt}</p>
        )}
        <div className="post-card-footer">
          {post.date && (
            <span className="post-card-date">{formatDate(post.date)}</span>
          )}
          <Link href={`/${post.slug}`} className="read-more">
            Read More
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
