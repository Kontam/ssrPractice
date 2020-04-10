import React from 'react';
import styled from 'styled-components';
import { ChoiceGroups } from '../../../redux/modules/choiceGroups';
import ChoiceGroupCard from '../ChoiceGroupCard';

const List = styled.li`
  
`;

export type Props = {
  choiceGroups: ChoiceGroups,
  onUpdateChoiceDialogOpen: (groupId: string) => void,
  onRemoveChoiceDialogOpen: (groupId: string) => void,
}

const ChoiceGroupList: React.FC<Props> = ({
  choiceGroups,
  onUpdateChoiceDialogOpen,
  onRemoveChoiceDialogOpen,
}) => {
  return (
    <List>
      {
        choiceGroups.map((choiceGroup) => (
          <ChoiceGroupCard
            key={choiceGroup.groupId}  
            choiceGroup={choiceGroup}
            onUpdateChoiceDialogOpen={onUpdateChoiceDialogOpen}
            onRemoveChoiceDialogOpen={onRemoveChoiceDialogOpen}
          />
        ))
      }
    </List>
  )
}

export default ChoiceGroupList;
