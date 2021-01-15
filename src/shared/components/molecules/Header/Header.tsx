import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import HeaderMenuItem from "../../atoms/HeaderMenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import LoadingLine from "../../atoms/LoadingLine";
import { HeaderLoading } from "../../../redux/modules/headerLoading";
import AppButtonContainer, { AppFAB } from "../AppButtonContainer";

export type NavMenu = {
  text: string;
  href: string;
  description: string;
};

const useStyles = makeStyles(() => ({
  root: {
    color: "white",
  },
  grow: {
    display: 'flex',
    flexGrow: 1,
  },
}));

export type HeaderProps = {
  navMenus: NavMenu[];
  headerLoading: HeaderLoading;
  appButtons?: AppFAB[];
};

const Header: React.FC<HeaderProps> = ({
  navMenus,
  headerLoading,
  appButtons,
}) => {
  const classes = useStyles();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <div className={classes.grow}>
          {navMenus.map((menu) => (
            <HeaderMenuItem key={menu.text} menu={menu} />
          ))}
        </div>
        {appButtons && <AppButtonContainer appButtons={appButtons} />}
      </Toolbar>
      <LoadingLine isLoading={headerLoading} />
    </AppBar>
  );
};

export default Header;
