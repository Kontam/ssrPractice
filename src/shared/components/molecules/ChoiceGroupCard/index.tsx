import React from 'react';
import ExpantionPanel from '@material-ui/core/ExpansionPanel';
import ExpantionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ChoiceGroup } from '../../../../../firebase/functions/src/functions/ChoiceGroupsAPI';

type Props = {
  choiceGroup: ChoiceGroup,
}

const ChoiceGroupCard :React.FC<Props> = ({ choiceGroup }) => {
  return(
    <div>
      <ExpantionPanel>
        <ExpantionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        > 
          {choiceGroup.groupName}
        </ExpantionPanelSummary>
      </ExpantionPanel>
      
    </div>
  )
}

export default ChoiceGroupCard;
