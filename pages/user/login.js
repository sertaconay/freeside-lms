/* eslint-disable */

import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Container } from 'semantic-ui-react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { getLinkOfStylesheet } from '../../core/constants';

// import MainLayout from '../../components/layout/Main';

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
        </Head>
        <Container fluid>
          <Grid centered columns={1}>
            <Grid.Row verticalAlign="middle">
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <Form size="large">
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      name="email"
                      placeholder="E-mail Address"
                      type="text"
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
                  New to us? <Link href="/user/register"><a>Sign Up</a></Link>
                </Message>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}
