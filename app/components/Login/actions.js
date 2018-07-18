import {axiosInstance} from '../../app';

export var loginUser = (params) => {
    return axiosInstance.post('/api/auth/login',params);
}