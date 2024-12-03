import { Html, Head, Main, NextScript } from "next/document";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>DotCade - OnChain Games Powered by Polkadot</title>
        <meta
          name="description"
          content="DotCade is a gaming platform for arcade games with a decentralised digital gaming ID shared across games"
        />

        <meta property="og:url" content="https://dotcade-polkadot.vercel.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="DotCade - OnChain Games Powered by Polkadot"
        />
        <meta
          property="og:description"
          content="DotCade is a gaming platform for arcade games with a decentralised digital gaming ID shared across games"
        />
        <meta
          property="og:image"
          content="https://opengraph.b-cdn.net/production/images/c895cd6e-078b-4cf4-a59d-093dd8433139.png?token=sCLW5L41Yz_sHT_N0CEmU5qzH6IZcOFwt9q6UeCxa_Y&height=642&width=1200&expires=33269184517"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="dotcade.fun" />
        <meta property="twitter:url" content="https://dotcade.fun" />
        <meta
          name="twitter:title"
          content="DotCade - OnChain Games Powered by Polkadot"
        />
        <meta
          name="twitter:description"
          content="DotCade is a gaming platform for arcade games with a decentralised digital gaming ID shared across games"
        />
        <meta
          name="twitter:image"
          content="https://opengraph.b-cdn.net/production/images/c895cd6e-078b-4cf4-a59d-093dd8433139.png?token=sCLW5L41Yz_sHT_N0CEmU5qzH6IZcOFwt9q6UeCxa_Y&height=642&width=1200&expires=33269184517"
        />

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
