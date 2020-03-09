import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, IconButton, CardContent, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { ContainerProps } from "./";

export type Props = {
    handleEditClickCreator: (id:string) => React.MouseEventHandler
} & ContainerProps


const useStyles = makeStyles({
    root: {
        width: 800,
    }
})

const LongoCard: React.FC<Props> = ({ longo, handleEditClickCreator }) => {
    const classes = useStyles();
    const handleEditClick = useCallback(handleEditClickCreator(longo.id), [longo.id])

    return (
        <Card className={classes.root}>
            <CardActions>
                <IconButton aria-label="Edit Item" onClick={handleEditClick}>
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