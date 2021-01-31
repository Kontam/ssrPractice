//import * as functions from 'firebase-functions';
//import longoAPIfunc from './functions/LongoAPI';
//import authorityAPIfunc from './functions/AuthorityAPI';
//import choiseGroupAPIfunc from './functions/ChoiceGroupsAPI';
//import choiseOptionAPIfunc from './functions/ChoiceOptionsAPI';
//import groupingAPIfunc from './functions/GroupingAPI';
export * from './functions';

export type Longo = {
    id: string,
    text: string,
    meaning: string,
    comment: string,
}

//const longoAPI = functions.https.onRequest(longoAPIfunc);
//const authorityAPI = functions.https.onRequest(authorityAPIfunc);
//const choiceGroupAPI = functions.https.onRequest(choiseGroupAPIfunc);
//const choiceOptionAPI = functions.https.onRequest(choiseOptionAPIfunc);
//const groupingAPI = functions.https.onRequest(groupingAPIfunc);

