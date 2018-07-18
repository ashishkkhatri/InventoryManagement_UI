/**
 *
 * ListInventory
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Table,Button } from 'react-bootstrap';
import EditInventory from '../EditInventory/index';

/* eslint-disable react/prefer-stateless-function */
class ListInventory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showEditInventoryModal:false,
      inventoryToEdit:{},
      inventoryAction:''
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.closeEditInventoryModal = this.closeEditInventoryModal.bind(this);
  }
  handleEditClick(e,index,action){
    let { inventories } = this.props;
    if(index !== -1){
      this.setState({
        showEditInventoryModal:true,
        inventoryToEdit:inventories[index],
        inventoryAction:action
      });
    } else {
      this.setState({
        showEditInventoryModal:true,
        inventoryToEdit:{},
        inventoryAction:action
      });
    }
  }
  closeEditInventoryModal(){
    this.setState({
      showEditInventoryModal:false
    });
  }
  render() {
    let { inventories } = this.props;
    let { showEditInventoryModal,inventoryToEdit } = this.state;
    return (
      <div>
        {/* <FormattedMessage {...messages.header} /> */}
        <Button type="button" onClick={(e)=>this.handleEditClick(e,-1,'add')}>Add Inventory</Button>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Vendor</th>
              <th>price</th>
              <th>Batch Number</th>
              <th>Batch Date</th>
              <th>Stock In Hand</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventories.map((data,index)=>{
            return (<tr key={index}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.vendor}</td>
              <td>{data.price}</td>
              <td>{data.batch_number}</td>
              <td>{data.batch_date}</td>
              <td>{data.stock_in_hand}</td>
              <td>{data.status === 1 ? 'Approved' : 'Pending'}</td>
              <td>
                <Button type="button" onClick={(e)=>this.handleEditClick(e,index,'edit')}>Edit</Button>
                <Button type="button" onClick={(e)=>this.props.deleteInventory(data.id)}>Delete</Button>
                {data.status === 0 && <Button type="button" onClick={(e)=>this.props.approveInventory(data.id)}>Approve</Button>}
              </td>
            </tr>)})}
          </tbody>
        </Table>
        {showEditInventoryModal && 
        <EditInventory 
          closeEditInventoryModal={this.closeEditInventoryModal} 
          inventory={inventoryToEdit}
          {...this.props} 
          inventoryAction={this.state.inventoryAction}
        />}
      </div>
    );
  }
}

ListInventory.propTypes = {};

export default ListInventory;

