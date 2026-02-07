import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title, description, image }) {
  const siteTitle = 'Tanghulu Recipe';
  const defaultDescription = 'Learn how to make perfect Tanghulu - the traditional Chinese candied fruit treat. Easy step-by-step recipes, tips, and techniques.';
  const defaultImage = '/og-image.jpg';

  const pageTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - Perfect Candied Fruit Recipe`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta property="og:image" content={image || defaultImage} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description || defaultDescription} />
        <meta name="twitter:image" content={image || defaultImage} />
      </Head>

      <div className="site-wrapper">
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
