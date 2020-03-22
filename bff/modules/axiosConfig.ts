import axiosFactory from 'axios';

import BFFConst from '../const';

const axios = axiosFactory.create({
    baseURL: BFFConst.BACKEND_BASE_URL,
    timeout: 20000,
    headers: {},
});

// export const getRequest = <Paylaod>(endpoint = "") => axios.get<Paylaod>(endpoint)
// .then((response) => {
//     return response.data;
// }).catch((reason) => console.log("getRequest error", reason));

export default axios;
