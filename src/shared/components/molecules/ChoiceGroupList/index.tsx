import React from 'react';
import styled from 'styled-components';
import { ChoiceGroups } from '../../../redux/modules/choiceGroups';
import ChoiceGroupCard from '../ChoiceGroupCard';

const List = styled.li`
  
`;

export type Props = {
  choiceGroups: ChoiceGroups,
}

const ChoiceGroupList: React.FC<Props> = ({ choiceGroups }) => {
  return (
    <List>
      {
        choiceGroups.map((choiceGroup) => (
          <ChoiceGroupCard
            key={choiceGroup.groupId}  
            choiceGroup={choiceGroup}
          />
        ))
      }
    </List>
  )
}

export default ChoiceGroupList;
