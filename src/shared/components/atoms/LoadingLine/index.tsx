import React from 'react';
import LoadingLine from './LoadingLine';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Loading } from '../../../redux/modules/loading';
import { LinearProgressProps } from '@material-ui/core';

export default () => {
    const loading = useSelector<RootState, Loading>(state => state.loading)

    const props: Partial<LinearProgressProps> = {
        variant: loading ? "indeterminate" : "determinate", 
        value: 0
    }
    return (
        <LoadingLine {...props}/>
    )
}