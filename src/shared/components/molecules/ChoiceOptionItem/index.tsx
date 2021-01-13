import React, { ChangeEvent } from 'react';
import { createStyles, makeStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { EventWithDataHandler } from 'redux-form';
import FormTextField from '../../atoms/FormTextField';
import FormCheckboxField from '../../atoms/FormCheckboxField';

type Props = {
  objectName: string,
  index: number,
  onTextChange: EventWithDataHandler<ChangeEvent<any>>
}

const useStyles = makeStyles(
  createStyles({
    itemContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingLeft: 15,
      paddingRight: 15,
    },
    textField: {
      width: 300,
    },

    checkboxLabel: {
      fontSize: 10,
    }
  })
)

const ChoiceOptionItem: React.FC<Props> = ({ objectName, index, onTextChange }) => {
  const classes = useStyles();
  return (
    <li className={classes.itemContainer} >
        <FormTextField 
            name={`${objectName}.choiceName`}
            className={classes.textField}
            label={`名前${index + 1}`}
            onChange={onTextChange}
        />
        <FormControlLabel
            value="有効"
            className={classes.checkboxLabel}
            control={<FormCheckboxField color="primary" size="small" name={`${objectName}.choiceEnabled`}/>}
            label="有効"
            labelPlacement="start"
        />
    </li>
  );
}

export default ChoiceOptionItem;
