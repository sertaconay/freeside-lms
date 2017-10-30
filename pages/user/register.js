import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

import { getLinkOfStylesheet } from '../../core/constants';


const stylesToUse = ['modal', 'button', 'image', 'header', 'transition', 'dimmer', 'form', 'message', 'segment', 'icon', 'input'];

export default class RegisterPage extends Component {
  handleSubmit(e) {

  }

  render() {
    return (
      <div>
        <Head>
          {stylesToUse.map(fileName => (
            <link key={fileName} rel="stylesheet" href={getLinkOfStylesheet(fileName)}/>
          ))}
          <link rel="stylesheet" href="/static/css/style.css" />
        </Head>
      </div>
    );
  }
}
