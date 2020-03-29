import axiosFactory from 'axios';

import BFFConst from '../../src/shared/modules/const';

const axios = axiosFactory.create({
    baseURL: BFFConst.BACKEND_BASE_URL,
    timeout: 20000,
    headers: {},
});

export default axios;
