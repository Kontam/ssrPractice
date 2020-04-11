import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { ChoiceGroups } from '../../../redux/modules/choiceGroups';
import ChoiceGroupCard from '../ChoiceGroupCard';

const useStyles = makeStyles(
  createStyles({
    list: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    item: {
      marginBottom: 30,
    } 
  })
);

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

  const classes = useStyles();

  return (
    <ul className={classes.list}>
      {
        choiceGroups.map((choiceGroup) => (
          <li className={classes.item} key={choiceGroup.groupId}>
            <ChoiceGroupCard
              choiceGroup={choiceGroup}
              onUpdateChoiceDialogOpen={onUpdateChoiceDialogOpen}
              onRemoveChoiceDialogOpen={onRemoveChoiceDialogOpen}
            />
          </li>
        ))
      }
    </ul>
  )
}

export default ChoiceGroupList;
