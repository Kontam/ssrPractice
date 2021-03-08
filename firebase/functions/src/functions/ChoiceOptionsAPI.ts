import * as functions from 'firebase-functions';
import { ChoiceOptionsController } from '../modules/controllers/ChoiceOptionsController';

async function choiceOptionsAPIfunc(req: functions.Request, res: functions.Response) {
  const controller = new ChoiceOptionsController();

  switch(req.method) {
    case "GET":
      res.send(await controller.get(req, res));
  }
}

export const choiceOptionsAPI = functions.https.onRequest(choiceOptionsAPIfunc);
