import { SuebotAPIExeption } from "../classes/SuebotAPIException";
import * as functions from "firebase-functions";

export function errorResponse(e: SuebotAPIExeption, res: functions.Response) {
  if (e.response) {
    res.status(400).send(e.response());
  } else {
    console.error(e);
    res.status(500).send(e);
  }
}
