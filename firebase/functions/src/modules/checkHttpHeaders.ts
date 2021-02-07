import * as functions from "firebase-functions";
import * as jwt from "jsonwebtoken";

export function checkHttpHeaders(
  request: functions.Request,
  response: functions.Response
) {
  const apiToken = request.header("x-api-key");
  if (!apiToken) {
    response.send({
      error: true,
      reason: "missing api key on request"
    });
    return false;
  }
  try {
    const apisecret = functions.config().general.apisecret;
    const decoded = jwt.verify(apiToken, apisecret);
    if (decoded !== functions.config().general.apiKey)
      throw new Error(apisecret);
    return true;
  } catch(e) {
    response.send({
      error: true,
      reason: `invalid api token`
    });
    return false;
  }
}
