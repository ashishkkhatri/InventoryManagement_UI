/**
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { AUTH_TOKEN } from './constants';
import {getInventoryAction,deleteInventoryAction,approveInventoryAction} from './actions';
import ListInventory from '../../components/ListInventory';

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.Component {
  constructor(props){
    super(props);
    let authToken = localStorage.getItem(AUTH_TOKEN);
    if(authToken === null){
      props.history.push('/');
    }
    this.state={
      inventories:[]
    };
    this.deleteInventory = this.deleteInventory.bind(this);
    this.getInventory = this.getInventory.bind(this);
    this.approveInventory = this.approveInventory.bind(this);
  }
  componentDidMount(){
    this.getInventory();
  }
  getInventory(){
    getInventoryAction().then((response)=>{
      this.setState({inventories:response.data.inventory});
    });
  }
  approveInventory(id){
    let param = {id};
    approveInventoryAction(param).then((response)=>{
      this.getInventory();
    });
  }
  deleteInventory(id){
    let param = {id};
    deleteInventoryAction(param).then((response)=>{
      this.getInventory();
    });
  }
  render() {
    let { inventories } = this.state;
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Description of Dashboard" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        <ListInventory 
          inventories={inventories} 
          deleteInventory={this.deleteInventory} 
          getInventory={this.getInventory}
          approveInventory={this.approveInventory}
        />
      </div>
    );
  }
}

// Dashboard.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);
