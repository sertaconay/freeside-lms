import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { getLinkOfStylesheet } from '../core/constants';


const stylesToUse = ['modal', 'button', 'image', 'header', 'transition', 'dimmer', 'form', 'message', 'segment', 'icon', 'input'];

export default class LoginPage extends Component {
  constructor(...args) {
    super(...args);
    this.loginURL = '/login';
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { email, password } = e.target;
    axios.post(this.loginURL, { email: email.value, password: password.value })
      .then(({ data }) => console.log(data))
      .catch(console.error);
  }

  render() {
    return (
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
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    name="email"
                    placeholder="E-mail address"
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                  <Button color="teal" fluid size="large">Login</Button>
                </Segment>
              </Form>
              <Message>
                New to us? <a href="/">Sign Up</a>
                <br />
                <Link href="/"><Button as="a">Home</Button></Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}
