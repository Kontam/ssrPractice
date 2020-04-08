import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { EventWithDataHandler } from 'redux-form';
import FormTextField from '../../atoms/FormTextField';
import FormCheckboxField from '../../atoms/FormCheckboxField';

type Props = {
  objectName: string,
  index: number,
  onTextChange: EventWithDataHandler<ChangeEvent<any>>
}

const OptionItem = styled.li``;

const ChoiceOptionItem: React.FC<Props> = ({ objectName, index, onTextChange }) => {
  return (
    <OptionItem>
        <FormTextField 
            name={`${objectName}.choiceName`}
            label={`名前${index + 1}`}
            onChange={onTextChange}
        />
        <FormControlLabel
            value="有効"
            control={<FormCheckboxField color="primary" name={`${objectName}.choiceEnabled`}/>}
            label="有効"
            labelPlacement="start"
        />
    </OptionItem>
  );
}

export default ChoiceOptionItem;
