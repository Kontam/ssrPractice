import React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@material-ui/core/LinearProgress";

type Props = {
  isLoading: boolean;
};

const LoadingLine: React.FC<Props> = ({ isLoading }) => {
  const MUIprops: Partial<LinearProgressProps> = {
    variant: isLoading ? "indeterminate" : "determinate",
    value: 0,
  };

  return <LinearProgress {...MUIprops} />;
};

export default LoadingLine;
