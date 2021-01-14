import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Longos } from "../../../redux/modules/longos";
import LongoCard from "../LongoCard";

type Props = {
  longos: Longos;
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  item: {
    marginTop: 20,
  },
});

const LongoList: React.FC<Props> = ({ longos }) => {
  const styles = useStyles();
  return (
    <ul className={styles.root}>
      {longos.map((longo) => (
        <li className={styles.item} key={longo.id}>
          <LongoCard longo={longo} />
        </li>
      ))}
    </ul>
  );
};

export default LongoList;
