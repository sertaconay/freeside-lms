import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Head from 'next/head';
import { getLinkOfStylesheet } from '../core/constants';


const stylesToUse = ['modal', 'button', 'image', 'header', 'transition', 'dimmer', 'form', 'message', 'segment', 'icon', 'input'];

const IndexPage = () => (
  <div>
    <Head>
      {stylesToUse.map(fileName => (
        <link key={fileName} rel="stylesheet" href={getLinkOfStylesheet(fileName)} />
      ))}
      <link rel="stylesheet" href="/static/css/style.css" />
    </Head>
    <div className="login-form">
      <Grid
        textAlign="center"
        style={{ height: '100%' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="/static/images/logo.png" />
            {' '}Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              <Button color="teal" fluid size="large">Login</Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href="/">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  </div>
);

export default IndexPage;
