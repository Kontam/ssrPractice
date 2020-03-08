import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

import { Longo } from '../../../redux/modules/longos';

type Prop = {
    longo: Longo
}

const CardWrapper = styled.li`
    list-style: none;
`;

const useStyles = makeStyles({
    root: {
        minWidth: 250,
    }
})

const LongoCard: React.FC<Prop> = ({ longo }) => {
    const classes = useStyles();

    return (
        <CardWrapper key={longo.id}>
            <Card className={classes.root}>
                <p>ID: {longo.id}</p>
                <p>Text: {longo.text}</p>
                <p>Meaning: {longo.meaning}</p>
                <p>Comment: {longo.comment}</p>
            </Card>
        </CardWrapper>
    )
}

export default LongoCard;