import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../molecules/Header";
import { AppFAB } from "../../molecules/AppButtonContainer";
import { useDispatch } from "react-redux";
import { setTrueIsMounted } from "../../../redux/modules/isMounted";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 30,
  },
  wrapper: {
    width: "95%",
  },
});

type Props = {
  children: any;
  appButtons?: AppFAB[];
};

const PageTemplate: React.FC<Props> = ({ children, appButtons }) => {
  // このフラグがTrue = CSRとなり、dataFetchをCSで行うかの判定が可能になる
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTrueIsMounted());
  }, []);
  const styles = useStyles();

  return (
    <div>
      <Header appButtons={appButtons && appButtons} />
      <div className={styles.root}>
        <div className={styles.wrapper}>{children}</div>
      </div>
    </div>
  );
};

export default PageTemplate;
