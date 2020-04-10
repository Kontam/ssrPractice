import {Request, Response} from 'express';

import axios from '../modules/axiosConfig';
import BFFConst from '../../src/shared/modules/const';
import { ChoiceGroup } from '../../firebase/functions/src/functions/ChoiceGroupsAPI';

type ChoiceGroups = ChoiceGroup[];

export default {
  name: BFFConst.CHOICEGROUPS_SERVICE,
  read: async (req: Request, resource: any, params: any, config: any, callback: any) => {
    const meta = {
        headers: {},
        statusCode: 200,
    };
    try {
      const result = await axios.get<ChoiceGroups>(BFFConst.API_CHOICEGROUPS);
      console.log("ChoiceGroups Service Get");
      callback(null, result.data, meta);
    } catch(e) {
      console.error(e);
    }
  },

  create: async (req:Request, resource:any, params: any, body: ChoiceGroup, config: any, callback: Function) => {
    const meta = {
      headers: {},
      statusCode: 200,
    };
    const result = await axios.post<ChoiceGroup>(BFFConst.API_CHOICEGROUPS, body);
    console.log("ChoiceGroups Service Post");
    callback(null, result.data, meta);
  },
  
  update: async (req:Request, resource:any, params: any, body: ChoiceGroup, config: any, callback: Function) => {
    const meta = {
      headers: {},
      statusCode: 200,
    };
    const result = await axios.patch<ChoiceGroup>(BFFConst.API_CHOICEGROUPS, body);
    console.log("ChoiceGroups Service Update");
    callback(null, result.data, meta);
  },

  delete: async (req:Request, resource:any, params: ChoiceGroup, config: any, callback: Function) => {
    const meta = {
      headers: {},
      statusCode: 200,
    };
    const result = await axios.delete<ChoiceGroup>(BFFConst.API_CHOICEGROUPS, { params });
    console.log("ChoiceGroups Service Delete");
    callback(null, result.data, meta);
  },
}

