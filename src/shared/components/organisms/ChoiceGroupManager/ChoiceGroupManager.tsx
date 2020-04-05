import React from 'react';
import { ChoiceGroups } from '../../../redux/modules/choiceGroups';
import { RootState } from '../../../redux/store';
import ChoiceGroupList from '../../molecules/ChoiceGroupList';

export type ChoiceGroupManagerProps = {
  choiceGroups: ChoiceGroups,
}

const ChoiceGroupManager: React.FC<ChoiceGroupManagerProps> = ({ choiceGroups }) => {
  return (
    <ChoiceGroupList choiceGroups={choiceGroups} />
  )
}

export default ChoiceGroupManager;
