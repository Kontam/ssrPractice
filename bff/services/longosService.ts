import axios from '../modules/axiosConfig';
import BFFConst from '../const';

export type Longo = {
    text: string,
    meaning: string,
    comment: string,
};

export type Longos = Longo[];


export type updateParams = {
    id: string,
}

export type deleteParams = {
    id: string,
}

export default {
    name: BFFConst.LONGOS_SERVICE,
    read: async (req :Express.Request, resource :any, params :any, config :any, callback :any) => {
        const meta = {
            headers: {},
            statusCode: 200,
        };
        const result = await axios.get<Longos>(BFFConst.API_LONGOS)
        console.log("Longos Service Get");
        callback(null, result.data, meta);
    },
    create: async (req: Express.Request, resource: any, params: any, body: Longo, config: any, callback: any) => {
        const meta = {
            headers: {},
            statusCode: 200,
        };
        const result = await axios.post<Longo>(BFFConst.API_LONGOS, body);

        console.log("Longos Service Post");
        callback(null, result.data, meta);
    },
    update: async (req: Express.Request, resource: any, params: updateParams, body: any, config: any, callback: any) => {
        const meta = {
            headers: {},
            statusCode: 200,
        };
        const result = await axios.patch<Longo>(BFFConst.API_LONGOS, body)
        console.log("Longos Servce Patch")
        callback(null, result.data, meta);
    },

    delete: async (req: Express.Request, resource: any, params: {id: string}, config: any, callback: any) => {
        const meta = {
            headers: {},
            statusCode: 200,
        };
        const result = await axios.delete<Longo>(BFFConst.API_LONGOS, { data: params })
        console.log("Longos Servce Delete", result.data)
        callback(null, result.data, meta);
    },
}
