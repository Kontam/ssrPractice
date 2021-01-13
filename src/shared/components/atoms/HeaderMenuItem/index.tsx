import React from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import { NavMenu } from "../../molecules/Header/Header";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginRight: 30,
    "& :hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
  },
});

export type HeaderMenuItemProps = { menu: NavMenu };

const HeaderMenuItem: React.FC<HeaderMenuItemProps> = ({ menu }) => {
  const styles = useStyles();
  return (
    <li className={styles.root}>
      <Tooltip title={menu.description} placement="bottom-start">
        <Link to={menu.href}>
          <Typography variant="h6" color="initial">
            {menu.text}
          </Typography>
        </Link>
      </Tooltip>
    </li>
  );
};

export default HeaderMenuItem;
