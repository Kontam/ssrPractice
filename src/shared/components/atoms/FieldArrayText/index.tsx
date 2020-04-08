import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { WrappedFieldArrayProps, EventWithDataHandler } from 'redux-form';
import FormTextField from '../FormTextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ChoiceFormData } from '../../molecules/ChoiceForm';
import { ChoiceOption } from '../../../../../firebase/functions/src/functions/ChoiceGroupsAPI';
import FormCheckboxField from '../FormCheckboxField';
import ChoiceOptionItem from '../../molecules/ChoiceOptionItem';

const OptionList = styled.ul``;

const FieldArrayText = ({ fields, meta: { error }}: WrappedFieldArrayProps<ChoiceOption>) => { 
    const [added, setAdded] = useState<boolean[]>([]);

    return (
        <OptionList>
            {fields.map((option, index) => {
                const onChange: EventWithDataHandler<ChangeEvent<any>> = (e, newValue, previewsValue) => {
                    if (!previewsValue && !added[index]) {
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
                const data = fields.get(index);
                return ( 
                  <ChoiceOptionItem 
                    objectName={option}
                    index={index}
                    onTextChange={onChange}
                  />
            )})}
        </OptionList>
    );
}

export default FieldArrayText;
