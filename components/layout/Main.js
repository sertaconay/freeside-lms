import React from 'react';
// import Link from 'next/link';
import Head from 'next/head';
import PropTypes from 'prop-types';

import { getLinkOfStylesheet } from '../../core/constants';


const stylesToUse = ['grid', 'container', 'reset', 'site', 'transition'];

const MainLayout = ({ children }) => (
  <div className="mainLayout">
    <Head>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      {stylesToUse.map(fileName => (
        <link key={fileName} rel="stylesheet" href={getLinkOfStylesheet(fileName)} />
      ))}
    </Head>
    {children}
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
