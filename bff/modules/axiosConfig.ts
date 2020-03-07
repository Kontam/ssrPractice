import axiosFactory from 'axios';

import BFFConst from '../const';

const axios = axiosFactory.create({
    baseURL: BFFConst.BACKEND_ENDPOINT,
    timeout: 10000,
    headers: {},
});

// export const getRequest = <Paylaod>(endpoint = "") => axios.get<Paylaod>(endpoint)
// .then((response) => {
//     return response.data;
// }).catch((reason) => console.log("getRequest error", reason));

export default axios;