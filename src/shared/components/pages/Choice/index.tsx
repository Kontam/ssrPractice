import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageTemplate from '../../template/PageTemplate';
import { fetchChoiceGroups, ChoiceGroups } from '../../../redux/modules/choiceGroups';
import { RootState } from '../../../redux/store';
import Const from '../../../modules/const';
import ChoiceGroupManager from '../../organisms/ChoiceGroupManager';

const Choice: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChoiceGroups()); 
  },[]);


  return (
    <PageTemplate>
      <>
        <h1>ChoiceGroups</h1>  
        <ChoiceGroupManager />
      </>
    </PageTemplate>
  );
}

Choice.prototype.authorityLevel = Const;

export default Choice;
