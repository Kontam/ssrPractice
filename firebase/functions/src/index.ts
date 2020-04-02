import * as functions from 'firebase-functions';
import longoAPIfunc from './functions/LongoAPI';
import authorityAPIfunc from './functions/AuthorityAPI';
import choiseGroupAPIfunc from './functions/ChoiceGroupsAPI';

export type Longo = {
    id: string,
    text: string,
    meaning: string,
    comment: string,
}

export const longoAPI = functions.https.onRequest(longoAPIfunc);
export const authorityAPI = functions.https.onRequest(authorityAPIfunc);
export const choiceGroupAPI = functions.https.onRequest(choiseGroupAPIfunc);
