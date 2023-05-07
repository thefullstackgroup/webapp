import Head from 'next/head';

const Metadata = (props) => {
  const { title, description, keywords, openGraphImage = '' } = props;
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1"
        />
        <meta httpEquiv="content-type" content="text/html; charSet=utf-8" />
        <meta name="author" content="The Full Stack" />
        <meta name="description" content={description} />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@thefullstacknet" />
        <meta property="twitter:domain" content="thefullstack.network" />
        <meta property="twitter:url" content="https://thefullstack.network" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={
            openGraphImage ||
            `https://thefullstack.network/assets/og-thefullstack.png`
          }
        />

        {/* Open Graph */}
        <meta
          property="og:url"
          content="https://thefullstack.network"
          key="ogurl"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="thefullstack" key="ogsitename" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta
          property="og:image"
          content={
            openGraphImage ||
            `https://thefullstack.network/assets/og-thefullstack.png`
          }
          key="ogimage"
        />

        <meta name="keywords" content={keywords} />
        <meta name="theme-color" content="#18191c" />

        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://rsms.me/inter/inter.css"
          rel="preload stylesheet"
          as="style"
        />

        {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
        <link
          rel="preload stylesheet"
          as="style"
          href="https://fonts.googleapis.com/css?family=Roboto+Mono"
        />

        {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
        <link
          rel="preload stylesheet"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
        />
      </Head>
    </>
  );
};

export default Metadata;
