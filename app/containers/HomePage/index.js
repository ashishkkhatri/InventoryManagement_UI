/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Login from '../../components/Login';
import Register from '../../components/Register';
import { Tabs, Tab } from 'react-bootstrap';
import { AUTH_TOKEN } from './constants';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.Component {
  constructor(props){
    super(props);
    let authToken = localStorage.getItem(AUTH_TOKEN);
    if(authToken !== null){
      props.history.push('/dashboard');
    }
  }
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="LOGIN">
            <Login {...this.props}/>
          </Tab>
          <Tab eventKey={2} title="REGISTER">
            <Register/>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
