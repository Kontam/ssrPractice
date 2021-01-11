import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { ContainerProps } from "./";

export type Props = {
  handleEditClickCreator: (id: string) => React.MouseEventHandler;
  handleDeleteClickCreator: (id: string) => React.MouseEventHandler;
} & ContainerProps;

const useStyles = makeStyles({
  root: {
    width: 800,
  },
});

const LongoCard: React.FC<Props> = ({
  longo,
  handleEditClickCreator,
  handleDeleteClickCreator,
}) => {
  const classes = useStyles();
  const handleEditClick = useCallback(handleEditClickCreator(longo.id), [
    longo.id,
  ]);
  const handleDeleteClick = useCallback(handleDeleteClickCreator(longo.id), [
    longo.id,
  ]);

  return (
    <Card className={classes.root}>
      <CardActions>
        <Tooltip title="編集">
          <IconButton aria-label="Edit Item" onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="削除">
          <IconButton aria-label="Delete Item" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
      <CardContent>
        <Typography>Text: {longo.text}</Typography>
        <Typography>Meaning: {longo.meaning}</Typography>
        <Typography>Comment: {longo.comment}</Typography>
      </CardContent>
    </Card>
  );
};

export default LongoCard;
