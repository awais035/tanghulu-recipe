import Layout from '../components/Layout';
import Link from 'next/link';

export default function Custom404() {
  return (
    <Layout title="Page Not Found">
      <div className="error-page">
        <div className="error-content">
          <h1>404</h1>
          <h2>Oops! Recipe Not Found</h2>
          <p>
            The page you're looking for seems to have vanished like sugar in hot water!
          </p>
          <Link href="/" className="btn btn-primary">
            🍡 Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
