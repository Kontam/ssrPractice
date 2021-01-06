import React from "react";
import { Fab, Tooltip } from "@material-ui/core";

export type AppFAB = {
  name: string;
  color: "default" | "inherit" | "primary" | "secondary";
  onClick: React.MouseEventHandler;
  IconComponent: any;
  description: string;
};

type Props = {
  appButtons: AppFAB[];
};

const AppButtonContainer: React.FC<Props> = ({ appButtons }) => {
  return (
    <div>
      {appButtons.map((button) => (
        <Tooltip title={button.description} key={button.name}>
          <Fab color={button.color} onClick={button.onClick}>
            {button.IconComponent}
          </Fab>
        </Tooltip>
      ))}
    </div>
  );
};

export default AppButtonContainer;
