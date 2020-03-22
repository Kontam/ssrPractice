import * as functions from 'firebase-functions';
import longoAPIfunc from './modules/LongoAPI';

export type Longo = {
    id: string,
    text: string,
    meaning: string,
    comment: string,
}

export const longoAPI = functions.https.onRequest(longoAPIfunc)
