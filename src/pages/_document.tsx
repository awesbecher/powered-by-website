import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script 
          type="text/javascript" 
          src="https://cdn.jsdelivr.net/npm/@play-ai/agent-web-sdk@ht"
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              addEventListener("load", () => {
                PlayAI.open('MxWrNcBzfCl2Aqf7j61CR');
              });
            `
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
