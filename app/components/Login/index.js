/**
 *
 * Login
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Checkbox, Button } from 'react-bootstrap';
import { loginUser } from './actions';
import { AUTH_TOKEN } from './constants';
import { createAxiosInstance } from '../../app';

/* eslint-disable react/prefer-stateless-function */
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      errorMessage: '',
			emailErrorMessage:'',
			passwordErrorMessage:'',
			emailDirty: false,
			passwordDirty:false
    };
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);
  }

  validate(){
		const {email,password,emailDirty,passwordDirty} = this.state;
		let valid = true;
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	if(!re.test(email) && emailDirty){
			this.setState({emailErrorMessage: 'Please enter a correct Email ID.'});
			return false;
		} else {
			this.setState({emailErrorMessage:""});
		}
		// if(!re.test(password) && passwordDirty){
		// 	this.setState({passwordErrorMessage:"Your password should contain minimum eight characters, at least one letter and one number. No special characters"});
		// 	return false;
		// } else {
		// 	this.setState({passwordErrorMessage:""});
		// }
		return valid;
  }
  
  submitLoginForm(e){
		e.preventDefault();
		const {email,password} = this.state;
		
		if(!this.validate()){
			return;
		}

		let loginParams = {
			email:email,
			password:password
		};
		let { history } = this.props;
		loginUser(loginParams).then(
			(response)=>{
				if(response.status === 200){
          localStorage.setItem(AUTH_TOKEN,response.data.success.token);
          createAxiosInstance();
					history.push('/dashboard');
				} else {
					this.setState({errorMessage:response.error});
				}
			}
		).catch((error)=>{
			if(error.response.status === 422){
        let messages = '';
        let errors = error.response.data.errors;
        for(let field in errors){
          messages += errors[field].join('\n');
        }
        this.setState({errorMessage:messages});
      } else {
        this.setState({errorMessage:error.response.data.message});
      }
			// this.setState({errorMessage:error.response.data.error});
		});
  }
  
  handleChange(e, inputField){
		let change = {};
		change[inputField] = e.target.value;
		change[inputField+'Dirty'] = true;
        this.setState(change);
	}

  render() {
    const {email,password,errorMessage,emailErrorMessage,passwordErrorMessage} = this.state;
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <Row>
					<Col lg={12}>
            <Form horizontal onSubmit={this.submitLoginForm} className="login-form">
              <FormGroup controlId="loginFormHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl type="email" placeholder="Email" value={email} onChange={(e)=>this.handleChange(e,'email')} onBlur={this.validate} />
                </Col>
                {emailErrorMessage !== '' && <p className="danger">{emailErrorMessage}</p>}
              </FormGroup>

              <FormGroup controlId="loginFormHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl type="password" placeholder="Password" value={password} onChange={(e)=>this.handleChange(e,'password')} onBlur={this.validate} />
                </Col>
                {passwordErrorMessage !== '' && <p className="danger">{passwordErrorMessage}</p>}
              </FormGroup>
							{errorMessage !== '' && <p className="danger">{errorMessage}</p>}
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">Sign in</Button>
                </Col>
              </FormGroup>
            </Form>
					</Col>
				</Row>
      </div>
    );
  }
}

Login.propTypes = {};

export default Login;
