import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { getLinkOfStylesheet } from '../core/constants';


export default class MyDocument extends Document {
  constructor(...args) {
    super(...args);
    this.stylesToUse = ['grid', 'container', 'reset', 'site'];
  }

  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    return { html, head, errorHtml, chunks };
  }

  render() {
    return (
      <html lang="tr">
        <Head>
          {this.stylesToUse.map(fileName => (
            <link key={fileName} rel="stylesheet" href={getLinkOfStylesheet(fileName)} />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
