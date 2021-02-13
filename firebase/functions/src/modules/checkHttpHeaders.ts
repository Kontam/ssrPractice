import * as functions from "firebase-functions";
import * as jwt from "jsonwebtoken";
import { SuebotAPIExeption } from "../classes/SuebotAPIException";

export function checkHttpHeaders(
  request: functions.Request,
) {
  const apiToken = request.header("x-api-key");
  if (!apiToken) throw new SuebotAPIExeption("missing api key");
  const apisecret = functions.config().general.apisecret;
  const decoded = jwt.verify(apiToken, apisecret);
  if (decoded !== functions.config().general.apikey) {
    throw new SuebotAPIExeption("invalid api token");
  }
  return true;
}
