/**
 *
 * EditInventory
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {Modal,Button,Form,FormGroup,Col,ControlLabel,Checkbox,FormControl} from 'react-bootstrap';
import {editInventoryAction,addInventoryAction} from './actions';

/* eslint-disable react/prefer-stateless-function */
class EditInventory extends React.Component {
  constructor(props){
    super(props);
    let {inventory}=props;
    this.state={
      id:inventory.id,
      name:inventory.name,
      vendor:inventory.vendor,
      price:inventory.price,
      batch_number:inventory.batch_number,
      batch_date:inventory.batch_date,
      stock_in_hand:inventory.stock_in_hand,
      // status:inventory.status,
      errorMessage:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitEditForm = this.submitEditForm.bind(this);
  }
  handleChange(e, inputField){
    let change = {};
    let value;
    // let {status} = this.state;
    // if(e.target.type === 'checkbox'){
    //   if(status === 0){
    //     value = 1;
    //   } else {
    //     value = 0;
    //   }
    // } else {
      value = e.target.value;
    // }
		change[inputField] = value;
        this.setState(change);
  }
  submitEditForm(e){
    e.preventDefault();
    let data = {};
    let {inventoryAction} = this.props;
    data.name = this.state.name;
    data.vendor = this.state.vendor;
    data.price = this.state.price;
    data.batch_number = this.state.batch_number;
    data.batch_date = this.state.batch_date;
    data.stock_in_hand = this.state.stock_in_hand;
    let result;
    if(inventoryAction !== 'add'){
      data.id = this.state.id;
      result = editInventoryAction(data)
    } else {
      result = addInventoryAction(data);
    }
    result.then((response)=>{
      this.props.closeEditInventoryModal();
      this.props.getInventory();
    }).catch((error)=>{
			if(error.response.status === 422){
        let messages = '';
        let errors = error.response.data.errors;
        for(let field in errors){
          messages += errors[field].join('\n');
        }
        this.setState({errorMessage:messages});
      } else {
        this.setState({errorMessage:error.response.message});
      }
		});
  }
  render() {
    let {closeEditInventoryModal,inventoryAction} = this.props;
    let {id,name,vendor,price,batch_number,batch_date,stock_in_hand,errorMessage} = this.state;
    return (
      <div>
        {/* <FormattedMessage {...messages.header} /> */}
        {errorMessage !== '' && <p>{errorMessage}</p>}
        <Modal show={true} onHide={()=>closeEditInventoryModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Inventory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form horizontal onSubmit={this.submitEditForm}>
            {inventoryAction !== 'add' && <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                ID
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="ID" value={id} disabled={true}/>
              </Col>
            </FormGroup>}

            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ControlLabel} sm={2}>
                Name
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Name" value={name} onChange={(e)=>this.handleChange(e,'name')}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalVendor">
              <Col componentClass={ControlLabel} sm={2}>
                Vendor
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Vendor" value={vendor} onChange={(e)=>this.handleChange(e,'vendor')}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPrice">
              <Col componentClass={ControlLabel} sm={2}>
                Price
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Price" value={price} onChange={(e)=>this.handleChange(e,'price')}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalBatchNumber">
              <Col componentClass={ControlLabel} sm={2}>
                Batch Number
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Batch Number" value={batch_number} onChange={(e)=>this.handleChange(e,'batch_number')}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalBatchDate">
              <Col componentClass={ControlLabel} sm={2}>
                Batch Date
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Batch Date" value={batch_date} onChange={(e)=>this.handleChange(e,'batch_date')}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalstockInHand">
              <Col componentClass={ControlLabel} sm={2}>
                Stock In Hand
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Stock In Hand" value={stock_in_hand} onChange={(e)=>this.handleChange(e,'stock_in_hand')}/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit">{inventoryAction.toUpperCase()}</Button>
                <Button onClick={()=>closeEditInventoryModal()}>Close</Button>
              </Col>
            </FormGroup>
          </Form>;
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

EditInventory.propTypes = {};

export default EditInventory;
