import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=ABeeZee&family=Bree+Serif&family=Arvo:wght@400;700&family=Chivo:wght@400;700&family=Macondo&display=swap" rel="stylesheet"/>
            {/* <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet"></link> */}
            <link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.6/css/unicons.css"></link>

            {/* <script data-ad-client="ca-pub-2277292020055346" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> */}

            {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> */}
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2277292020055346"
     crossOrigin="anonymous"></script>
            {/* <script dangerouslySetInnerHTML={{__html: `
       	(adsbygoogle = window.adsbygoogle || []).push({
         	google_ad_client: "ca-pub-2277292020055346",
         	enable_page_level_ads: true
         	});
        	`,
        	}} /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument