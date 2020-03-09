import React from 'react';
import LongoCard, { Props } from './LongoCard'
import { useDispatch } from 'react-redux';
import { openUpdateDialog } from '../../../redux/modules/updateDialogState';
import { Longo } from '../../../redux/modules/longos';

export type ContainerProps = {
    longo: Longo;
};

export default (props: ContainerProps) => {
    const dispatch = useDispatch();
    const handleEditClickCreator = (id: string) => () => {dispatch(openUpdateDialog(id))}

    return (
        <LongoCard
            {...props}
            handleEditClickCreator={handleEditClickCreator}
        />
    )
}