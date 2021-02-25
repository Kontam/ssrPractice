import * as functions from "firebase-functions";
import admin from "../modules/firebaseAdmin";
import {
  ChoiceGroup,
  ChoiceGroupDB,
  ChoiceOption,
  ChoiceOptionDB
} from "../types";
import {ChoiceGroupsController} from "../modules/controllers/ChoiceGroupController";

export const CHOICE_GROUPS = "ChoiceGroups" as const;
export const CHOICE_OPTIONS = "ChoiceOptions" as const;

/**
 * choiceGroupを操作するAPI
 * 主にグループの編集で利用される想定
 * */
async function choiceGroupsAPIfunc(
  request: functions.Request,
  response: functions.Response
): Promise<void> {
  response.set("Access-Control-Allow-Origin", "http://localhost:3000"); // localhostを許可
  response.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST"); // DELETEだけは拒否
  response.set("Access-Control-Allow-Headers", "X-Api-Key"); // Content-Typeのみを許可
//  if (!checkHttpHeaders(request)) return;

  const firestore = admin.firestore();
  const timeStamp = admin.firestore.FieldValue.serverTimestamp();
  const groupRef = firestore.collection(CHOICE_GROUPS);
  const optionRef = firestore.collection(CHOICE_OPTIONS);

  const controller = new ChoiceGroupsController();
  switch (request.method) {
    case "GET":
      response.send(await controller.get(request, response));
      break;

    case "POST":
      response.send(await controller.post(request, response));
      break;

    case "PATCH":
      const patchPost: ChoiceGroup = request.body;
      const groupDoc = groupRef.doc(patchPost.groupId);
      await groupDoc.update({ groupName: patchPost.groupName });

      const patchOptionBatch = firestore.batch();
      // Optionsの数は減少する可能性があるのでDelete then insert
      const optionQuerySnapshot = await optionRef
        .where("groupId", "==", patchPost.groupId)
        .get();
      optionQuerySnapshot.forEach(docSnap => {
        patchOptionBatch.delete(docSnap.ref);
      });
      await patchOptionBatch.commit();

      const patchInsertedData = await Promise.all(
        patchPost.choiceOptions.map(option => {
          const insertData: ChoiceOptionDB = {
            groupId: patchPost.groupId,
            choiceName: option.choiceName,
            choiceEnabled: option.choiceEnabled,
            createdAt: timeStamp
          };
          return optionRef.add(insertData);
        })
      );

      const patchResponseOptions: ChoiceOption[] = await Promise.all(
        patchInsertedData.map(async docRef => {
          const patchSnapshot = await docRef.get();
          const patchData = patchSnapshot.data();
          return {
            choiceId: docRef.id,
            choiceName: patchData!.choiceName,
            choiceEnabled: patchData!.choiceEnabled
          };
        })
      );

      const patchTargetSnap = await groupDoc.get();
      const patchedData = patchTargetSnap.data();
      const patchResponseGroup: ChoiceGroup = {
        groupId: groupDoc.id,
        groupName: (patchedData && patchedData.groupName) || "",
        choiceOptions: patchResponseOptions
      };
      response.send(patchResponseGroup);
      break;

    case "DELETE":
      if (!request.query.groupId) {
        response.send("invalid request");
        return;
      }
      const deleteTargetId = request.query.groupId;
      if (typeof deleteTargetId !== "string") {
        response.send("invalid target ID");
        return;
      }
      const deleteDocRef = groupRef.doc(deleteTargetId);
      const docId = deleteDocRef.id;

      const deleteBatch = firestore.batch();
      deleteBatch.delete(deleteDocRef);

      const deleteOptionsSnap = await optionRef
        .where("groupId", "==", docId)
        .get();
      deleteOptionsSnap.forEach(docSnap => {
        deleteBatch.delete(docSnap.ref);
      });
      await deleteBatch.commit();
      response.send(docId);
      break;
    default:
      response.send("default");
  }
}

export const choiceGroupsAPI = functions.https.onRequest(choiceGroupsAPIfunc);
