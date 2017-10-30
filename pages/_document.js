import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { getLinkOfStylesheet } from '../core/constants';


export default class SiteDocument extends Document {
  constructor(...args) {
    super(...args);
    this.stylesToUse = ['grid', 'container', 'reset', 'site', 'transition'];
  }

  static getInitialProps({ renderPage }) {
    const {
      html, head, errorHtml, chunks,
    } = renderPage();
    return {
      html, head, errorHtml, chunks,
    };
  }

  render() {
    return (
      <html lang="tr">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
          {this.stylesToUse.map(fileName => (
            <link key={fileName} rel="stylesheet" href={getLinkOfStylesheet(fileName)} />
          ))}
        </Head>
        <body>
          <span className="sa" />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
