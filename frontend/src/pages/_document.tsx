import { Html, Head, Main, NextScript } from "next/document";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />

        <GoogleAnalytics gaId="G-9SSE6ELV91" />
      </body>
    </Html>
  );
}
