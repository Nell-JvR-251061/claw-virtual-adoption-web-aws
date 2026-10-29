import { Helmet } from 'react-helmet-async';

function SEO({ title, description, path = '', image = 'https://claw-virtual-adoption.co.za/', noIndex = false }) {
  const siteName = "CVA";
  const baseUrl = "https://claw-virtual-adoption.co.za/";
  const fullUrl = `${baseUrl}${path}`;

  return (
    <Helmet>
      <title>{`${siteName} | ${title}`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <link rel="alternate" hreflang="en-za" href= 'https://www.claw-virtual-adoption.co.za/'/>

      {noIndex ? (<meta name="robots" content="noindex, nofollow" /> ) : (<meta name="robots" content="index, follow"/> )}
      
      <meta property="og:title" content={`${siteName} | ${title}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website"/>
      <meta property="og:locale" content="en_ZA" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${siteName} | ${title}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

export default SEO;