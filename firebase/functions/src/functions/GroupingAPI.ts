import * as functions from 'firebase-functions';
import admin from "../modules/firebaseAdmin";
import { Request, Response } from "firebase-functions";
import { CHOICE_GROUPS, CHOICE_OPTIONS } from "./ChoiceGroupsAPI";
import { getOptionsByGroupName } from "../functions/ChoiceOptionsAPI";
import { splitArray } from "../modules/splitArray";
import { ChoiceOption, SuebotAPIError } from "../types.d";
import { randomSort } from "../modules/randomSort";
import { checkHttpHeaders } from "../modules/checkHttpHeaders";
import { API } from '../types.d';

/**
 * choiceGroupをx人組に分けるAPI
 * 分けた後のデータを保存したりするためにBEで行う
 */
export const groupingAPI2: API = {
  endpoint: '/groupingAPI',
  handler: (req, res) => {
    groupingAPIfunc(req,res);
  }
}

export const groupingAPI = functions.https.onRequest(groupingAPIfunc);

export async function groupingAPIfunc(
  request: Request,
  response: Response
) {
  if (!checkHttpHeaders(request, response)) return;
  const { amount, groupName } = request.query;

  switch (request.method) {
    case "GET":
      if (!amount || typeof amount !== "string") {
        response.send("Bad Request");
        return;
      }
      if (!groupName || typeof groupName !== "string") {
        response.send("Bad Request");
        return;
      }
      response.send(await getGroupedOptions(groupName, +amount));
      return;
    default:
      response.send("");
      return;
  }
}

async function getGroupedOptions(
  groupName: string,
  amount: number
): Promise<Array<Array<ChoiceOption>> | SuebotAPIError> {
  const firestore = admin.firestore();
  const groupRef = firestore.collection(CHOICE_GROUPS);
  const optionRef = firestore.collection(CHOICE_OPTIONS);
  const options = await getOptionsByGroupName(groupName, groupRef, optionRef);
  if (!options) {
    return {
      error: true,
      reason: "invalid groupName"
    };
  }

  const randomSortedOptions = randomSort(
    options.filter(option => option.choiceEnabled)
  );

  return splitArray(randomSortedOptions, amount);
}
