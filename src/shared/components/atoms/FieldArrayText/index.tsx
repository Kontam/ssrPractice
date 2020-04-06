import React, { FocusEvent, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { WrappedFieldArrayProps, EventWithDataHandler } from 'redux-form';
import FormTextField from '../FormTextField';

const OptionList = styled.ul``;
const OptionItem = styled.li``;

const FieldArrayText = ({ fields, meta: { error }}: WrappedFieldArrayProps) => { 
    const [added, setAdded] = useState<boolean[]>([]);

    return (
        <OptionList>
            {fields.map((option, index) => {
                const onChange: EventWithDataHandler<ChangeEvent<any>> = (e, newValue, previewsValue) => {
                    if (!previewsValue && !added[index]) {
                        fields.push({});
                        const newAdded = [...added];
                        newAdded[index] = true;
                        setAdded(newAdded)
                    }
                } 
                return ( 
                    <OptionItem key={index}>
                        <FormTextField 
                            name={`${option}.choiceName`}
                            label={`名前${index + 1}`}
                            onChange={onChange}
                        />
                    </OptionItem>
            )})}
        </OptionList>
    );
}

export default FieldArrayText;