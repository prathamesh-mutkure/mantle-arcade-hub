import { Html, Head, Main, NextScript } from "next/document";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <GoogleAnalytics gaId="G-9SSE6ELV91" />

      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
