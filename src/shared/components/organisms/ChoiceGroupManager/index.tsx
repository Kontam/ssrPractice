import React from 'react';
import { useSelector } from 'react-redux';
import { ChoiceGroups } from '../../../redux/modules/choiceGroups';
import { RootState } from '../../../redux/store';
import ChoiceGroupManager from './ChoiceGroupManager';

const ChoiceGroupManagerContainer = () => {
  const choiceGroups =  useSelector<RootState, ChoiceGroups>(state => state.app.choiceGroups);
  return (
    <ChoiceGroupManager choiceGroups={choiceGroups} />
  )
}

export default ChoiceGroupManagerContainer;
