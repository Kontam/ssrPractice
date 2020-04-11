import React from 'react';
import PageTemplate from '../../template/PageTemplate';
import ChoiceGroupManager from '../../organisms/ChoiceGroupManager';
import { AppFAB } from '../../molecules/AppButtonContainer';
import SnackBar from '../../atoms/SnackBar';
import { AuthStatus } from '../../../modules/getAuthStatus';
import Const from '../../../modules/const';
import UnAuthrizedMessage from '../../molecules/UnauthrizedMessage';

type Props = {
    appButtons: AppFAB[],
    authStatus: AuthStatus,
}

const Choice: React.FC<Props> = ({ appButtons, authStatus }) => {

  return (
    <PageTemplate appButtons={appButtons}>
      { authStatus === Const.AUTHSTATUS_ENOUGH
      ? (
        <>
          <ChoiceGroupManager />
          <SnackBar />
        </>
      ) : <UnAuthrizedMessage authStatus={authStatus} />
    }
    </PageTemplate>
  );
}

export default Choice;
