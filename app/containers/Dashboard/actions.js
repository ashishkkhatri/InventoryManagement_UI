/*
 *
 * Dashboard actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import {axiosInstance} from '../../app';
import {GET_INVENTORY_SUCCESS} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getInventoryAction(){
  return axiosInstance.get('/api/inventory');
}

export function getInventorySuccess(data){
  return {
    type:GET_INVENTORY_SUCCESS,
    payload:data
  };
}
export function deleteInventoryAction(param){
  return axiosInstance.post('/api/inventory',param);
}

export function approveInventoryAction(param){
  return axiosInstance.post('/api/inventory/approve',param);
}