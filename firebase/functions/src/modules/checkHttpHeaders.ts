import * as functions from 'firebase-functions';
import * as jwt from 'jsonwebtoken';
import { HttpsError } from 'firebase-functions/lib/providers/https';

export function checkHttpHeaders(request: functions.Request, response: functions.Response) {
  const headers = request.headers;
  console.log(headers);
  const apiToken = request.header("x-api-key"); 
  if (!apiToken) {
    console.error("missing api token");
    throw new HttpsError("invalid-argument", "Invalid Argument")
    response.send({
      error: true,
      reason: "missing api key on request",
    });
    return false;
  }
  try {
    const apisecret = functions.config().general.apisecret;
    console.log("secret",apisecret);
    jwt.verify(apiToken, apisecret);
  } catch {
    throw new HttpsError("invalid-argument", "Invalid Argument")
    response.send({
      error: true,
      reason: "invalid api token",
    });
    console.error("invalid api token");
    return false;
  }
  return true;
}
