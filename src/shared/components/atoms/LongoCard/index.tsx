import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, IconButton, CardContent, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


import { Longo } from '../../../redux/modules/longos';

type Prop = {
    longo: Longo
}


const useStyles = makeStyles({
    root: {
        width: 800,
    }
})

const LongoCard: React.FC<Prop> = ({ longo }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActions>
                <IconButton aria-label="Edit Item">
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="Delete Item">
                    <DeleteIcon />
                </IconButton>
            </CardActions>
            <CardContent>
                <Typography>ID: {longo.id}</Typography>
                <Typography>Text: {longo.text}</Typography>
                <Typography>Meaning: {longo.meaning}</Typography>
                <Typography>Comment: {longo.comment}</Typography>
            </CardContent>
        </Card>
    )
}

export default LongoCard;