import {axiosInstance} from '../../app';

export var registerUser = (params) => {
    return axiosInstance.post('/api/auth/register',params);
}