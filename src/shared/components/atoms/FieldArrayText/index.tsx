import React, { useState, ChangeEvent } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { WrappedFieldArrayProps, EventWithDataHandler } from 'redux-form';
import { ChoiceOption } from '../../../../../firebase/functions/src/types';
import ChoiceOptionItem from '../../molecules/ChoiceOptionItem';

const useStyles = makeStyles(
  createStyles({
    fieldWrapper: {
      paddingTop: 5,
      paddingBottom: 5,
    }
  })
);

const FieldArrayText = ({ fields, meta: { error }}: WrappedFieldArrayProps<ChoiceOption>) => { 
    const classes = useStyles();
    const [added, setAdded] = useState<boolean[]>([]);

    return (
        <ul>
            {fields.map((option, index) => {
                const onChange: EventWithDataHandler<ChangeEvent<any>> = (e, newValue, previewsValue) => {
                    // 最下行の空欄が埋められた時に自動で枠追加する
                    if (fields.length-1 === index && !previewsValue && !added[index]) {
                        fields.push({
                            choiceName: "",
                            choiceEnabled: true,
                            choiceId: "",
                        });
                        const newAdded = [...added];
                        newAdded[index] = true;
                        setAdded(newAdded)
                    }
                } 
                return ( 
                  <div className={classes.fieldWrapper} key={index}>
                    <ChoiceOptionItem
                      objectName={option}
                      index={index}
                      onTextChange={onChange}
                    />
                  </div>
            )})}
        </ul>
    );
}

export default FieldArrayText;
