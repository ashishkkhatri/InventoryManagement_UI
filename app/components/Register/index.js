/**
 *
 * Register
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Checkbox, Button } from 'react-bootstrap';
import { registerUser } from './actions';

/* eslint-disable react/prefer-stateless-function */
class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name:'',
      email: '',
      password: '',
      confirmPass: '',
      nameDirty:false,
      emailDirty:false,
      passwordDirty:false,
      confirmPassDirty:false,
      confirmPassErrorMessage:'',
      nameErrorMessage:'',
      emailErrorMessage:'',
      passwordErrorMessage:'',
      successMessage:''
    };
    this.submitRegistrationForm = this.submitRegistrationForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }
  
  handleChange(e,inputField){
    let change = {};
    change[inputField] = e.target.value;
    change[inputField+'Dirty'] = true;
    this.setState(change);
  }
  
  validate(){
    const {email,name,password,confirmPass,emailDirty,nameDirty,passwordDirty,confirmPassDirty} = this.state;
    let valid = true;
    var re = /^[a-zA-Z ]*$/;
    if(!re.test(name) && nameDirty){
      this.setState({nameErrorMessage: 'Only alphebets are accepted here.'});
      return false;
    } else {
      this.setState({nameErrorMessage:""});
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email) && emailDirty){
      this.setState({emailErrorMessage: 'Please enter a correct Email ID.'});
      return false;
    } else {
      this.setState({emailErrorMessage:""});
    }
    re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$_)(*&^%)])[A-Za-z\d@#$_)(*&^%)]{8,}$/;
    if(!re.test(password) && passwordDirty){
      this.setState({passwordErrorMessage:"Your password should contain minimum eight characters, at least one letter and one number. No special characters"});
      return false;
    } else {
      this.setState({passwordErrorMessage:""});
    }
    if(confirmPass !== password && confirmPassDirty){
      this.setState({confirmPassErrorMessage:"Your confirm password field does not match with the password field."});
      return false;
    } else {
      this.setState({confirmPassErrorMessage:""});
    }
    return valid;
  }
  
  submitRegistrationForm(e){
    e.preventDefault();
    const {name,email,password,confirmPass} = this.state;
    if(!this.validate()){
      return;
    }
  
    let registerParams = {
      name:name,
      email:email,
      password:password,
      password_confirmation:confirmPass
    };
    registerUser(registerParams).then(
    (response)=>{
      if(response.status === 200){
        let data = response.data;
        this.setState({registerMessage:data.message});
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
    });
  }
  render() {
    const {email,name,password,confirmPass,emailErrorMessage,passwordErrorMessage,confirmPassErrorMessage,nameErrorMessage,registerMessage,errorMessage} = this.state;
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <Row>
          <Col lg={12}>
          {registerMessage !== '' && <p>{registerMessage}</p>}
          {errorMessage !== '' && <p>{errorMessage}</p>}
              <Form onSubmit={this.submitRegistrationForm} className="registration-form">
                <FormGroup controlId="formHorizontalName">
                  <Col componentClass={ControlLabel} sm={2}>
                    Name
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" name="name" placeholder="Name" value={name} onChange={(e)=>this.handleChange(e,'name')} onBlur={this.validate} />
                  </Col>
                  {nameErrorMessage !== '' && <p className="danger">{nameErrorMessage}</p>}
                </FormGroup>
                <FormGroup controlId="regFormHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl type="email" name="email" placeholder="Email" value={email} onChange={(e)=>this.handleChange(e,'email')} onBlur={this.validate} />
                  </Col>
                  {emailErrorMessage !== '' && <p className="danger">{emailErrorMessage}</p>}
                </FormGroup>
                <FormGroup controlId="regFormHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" name="password" placeholder="Password" value={password} onChange={(e)=>this.handleChange(e,'password')} onBlur={this.validate} />
                  </Col>
                  {passwordErrorMessage !== '' && <p className="danger">{passwordErrorMessage}</p>}
                </FormGroup>
                <FormGroup controlId="regFormHorizontalConfirmPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Confirm Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" name="confirm-password" placeholder="Confirm Password" value={confirmPass} onChange={(e)=>this.handleChange(e,'confirmPass')} onBlur={this.validate}/>
                  </Col>
                  {confirmPassErrorMessage !== '' && <p className="danger">{confirmPassErrorMessage}</p>}
                </FormGroup>
                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit">Register Now</Button>
                  </Col>
                </FormGroup>
              </Form>
          </Col>
      </Row>
      </div>
    );
  }
}

Register.propTypes = {};

export default Register;