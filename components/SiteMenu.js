import React from 'react';
import Head from 'next/head';
import { Menu, Button, Container, Visibility, Segment, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import { getLinkOfStylesheet } from '../core/constants';


const stylesToUse = ['menu', 'button', 'segment', 'header', 'icon'];

const FixedMenu = () => (
  <Menu fixed="top" size="large">
    <Container>
      <Link href="/"><Menu.Item as="a" active>Home</Menu.Item></Link>
      <Menu.Item as="a">Work</Menu.Item>
      <Menu.Item as="a">Company</Menu.Item>
      <Menu.Item as="a">Careers</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item className="item">
          <Link href="/login"><Button as="a">Log in</Button></Link>
        </Menu.Item>
        <Menu.Item>
          <Button as="a" primary>Sign Up</Button>
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

const SiteMenu = ({ visible, showFixedMenu, hideFixedMenu, addCount }) => (
  <div>
    <Head>
      {stylesToUse.map(fileName => (
        <link key={fileName} rel="stylesheet" href={getLinkOfStylesheet(fileName)} />
      ))}
    </Head>

    {visible ? <FixedMenu /> : null}

    <Visibility
      onBottomPassed={showFixedMenu}
      onBottomVisible={hideFixedMenu}
      once={false}
    >
      <Segment
        inverted
        textAlign="center"
        style={{ minHeight: 700, padding: '1em 0em' }}
        vertical
      >
        <Container>
          <Menu inverted pointing secondary size="large">
            <Link href="/"><Menu.Item as="a" active>Home</Menu.Item></Link>
            <Menu.Item as="a">Work</Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item>
            <Menu.Item position="right">
              <Link href="/login"><Button as="a">Log in</Button></Link>
              <Button as="a" inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>
            </Menu.Item>
          </Menu>
        </Container>

        <Container text>
          <Header
            as="h1"
            content="Imagine-a-Company"
            inverted
            style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
          />
          <Header
            as="h2"
            content="Do whatever you want when you want to."
            inverted
            style={{ fontSize: '1.7em', fontWeight: 'normal' }}
          />
          <Button primary size="huge" onClick={addCount}>
            Get Started
            <Icon name="right arrow" />
          </Button>
        </Container>
      </Segment>
    </Visibility>
  </div>
);

SiteMenu.defaultProps = {
  visible: null,
};

SiteMenu.propTypes = {
  visible: PropTypes.bool,
  showFixedMenu: PropTypes.func.isRequired,
  hideFixedMenu: PropTypes.func.isRequired,
  addCount: PropTypes.func.isRequired,
};

export default connect(null, null)(SiteMenu);
