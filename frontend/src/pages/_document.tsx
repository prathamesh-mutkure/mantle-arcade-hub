import { Html, Head, Main, NextScript } from "next/document";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          async={true}
          src="https://www.googletagmanager.com/gtag/js?id=G-9SSE6ELV91"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9SSE6ELV91');
            `,
          }}
        />
      </Head>
      <GoogleAnalytics gaId="G-9SSE6ELV91" />

      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
