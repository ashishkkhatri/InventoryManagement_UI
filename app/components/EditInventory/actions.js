import {axiosInstance} from '../../app';

export function editInventoryAction(param){
    return axiosInstance.post('/api/inventory/edit',param);
}

export function addInventoryAction(param){
    return axiosInstance.post('/api/inventory/add',param);
}