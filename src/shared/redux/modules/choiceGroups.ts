import { call, put, takeEvery } from "redux-saga/effects";

import fetchr from '../util/fetchr';
import { Action, createAction, handleActions } from 'redux-actions';
import { ChoiceGroup, ChoiceOption } from '../../../../firebase/functions/src/functions/ChoiceGroupsAPI';
import { startHeaderLoading, endHeaderLoading } from './headerLoading';
import { AxiosResponse } from "axios";
import Const from '../../modules/const';

export type ChoiceGroups = ChoiceGroup[];

export const SET_CHOICEGROUPS = "SET_CHOICEGROUPS" as const;
export const REMOVE_CHOICEGROUP = "SER_CHOICEGROUP" as const;

export const FETCH_CHOICEGROUPS = "FETCH_CHOICEGROUPS" as const; 

export const setChoiceGroups = createAction<ChoiceGroups>(SET_CHOICEGROUPS);

// sagaAction
export const fetchChoiceGroups = createAction(FETCH_CHOICEGROUPS); 

export const INITIAL_STATE: ChoiceGroups = []; 

function* requestFetchChoiceGroup() {
  yield startHeaderLoading(); 
  // const result: AxiosResponse<ChoiceGroups> = yield call([fetchr, fetchr.read], Const.CHOICEGROUPS_SERVICE, {}, {});
  const result: AxiosResponse<ChoiceGroups> = yield fetchr.read(Const.CHOICEGROUPS_SERVICE).params({id: "aaa"}).end();
  yield put(setChoiceGroups(result.data))
  yield endHeaderLoading(); 
}

export const choiceGroupsSaga = [
  takeEvery(FETCH_CHOICEGROUPS, requestFetchChoiceGroup), 
];

export default handleActions<ChoiceGroups, any>({
  [SET_CHOICEGROUPS]: (state: ChoiceGroups, { payload }: Action<ChoiceGroups>) => ({
    ...payload,
  }),
}, INITIAL_STATE)
