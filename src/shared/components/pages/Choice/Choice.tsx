import React from 'react';
import PageTemplate from '../../template/PageTemplate';
import ChoiceGroupManager from '../../organisms/ChoiceGroupManager';
import { AppFAB } from '../../molecules/AppButtonContainer';

type Props = {
    appButtons: AppFAB[],
}

const Choice: React.FC<Props> = ({ appButtons }) => {

  return (
    <PageTemplate appButtons={appButtons}>
      <>
        <h1>ChoiceGroups</h1>  
        <ChoiceGroupManager />
      </>
    </PageTemplate>
  );
}

export default Choice;
