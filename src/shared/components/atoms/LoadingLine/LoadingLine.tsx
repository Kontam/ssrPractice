import React from 'react';
import { LinearProgress, LinearProgressProps } from '@material-ui/core';

type Props = Partial<LinearProgressProps>

const LoadingLine: React.FC<Props> = (props) => {
    return (
        <LinearProgress {...props} />
    )
}

export default LoadingLine;