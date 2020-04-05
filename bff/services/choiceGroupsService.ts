import {Request, Response} from 'express';

import axios from '../modules/axiosConfig';
import BFFConst from '../../src/shared/modules/const';
import { ChoiceGroup } from '../../firebase/functions/src/functions/ChoiceGroupsAPI';

type ChoiceGroups = ChoiceGroup[];

export default {
  name: BFFConst.CHOICEGROUPS_SERVICE,
  read: async (req: Request, resource: any, params: any, config: any, callback: any) => {
    console.log("Start ChoiceGroups Service Get");
    const meta = {
        headers: {},
        statusCode: 200,
    };

    const result = await axios.get<ChoiceGroups>(BFFConst.API_CHOICEGROUPS);
    console.log("ChoiceGroups Service Get");
    callback(null, result.data, meta);
  },
}

