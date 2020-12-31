import admin from "../modules/firebaseAdmin";
import { Request, Response } from "firebase-functions";
import { CHOICE_GROUPS, CHOICE_OPTIONS } from "./ChoiceGroupsAPI";
import { getOptionsByGroupName } from '../functions/ChoiceOptionsAPI';
import { splitArray } from '../modules/splitArray';
import { ChoiceOption } from '../types.d';
import { randomSort } from '../modules/randomSort';

/**
 * choiceGroupをx人組に分けるAPI
 * 分けた後のデータを保存したりするためにBEで行う
 */
export default async function groupingAPI(
  request: Request,
  response: Response
) {

  const { amount, name} = request.query;

  switch (request.method) {
    case "GET":
      if(!amount || typeof amount !== 'string') {
        response.send("Bad Request");
        return;
      }
      if(!name || typeof name !== 'string') {
        response.send("Bad Request");
        return;
      }

      response.send(await getGroupedOptions(name, +amount));
      return;
    default:
      response.send("");
      return;
  }
}

async function getGroupedOptions(groupName: string, amount: number): Promise<Array<Array<ChoiceOption>>> {
  const firestore = admin.firestore();
  const groupRef = firestore.collection(CHOICE_GROUPS);
  const optionRef = firestore.collection(CHOICE_OPTIONS)
  const options = await getOptionsByGroupName(groupName, groupRef, optionRef); 
  if (!options) return [[]];

  const randomSortedOptions = randomSort(options.filter(option => option.choiceEnabled));

  return splitArray(randomSortedOptions, amount);
}
