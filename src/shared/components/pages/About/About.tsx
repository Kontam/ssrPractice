
import React from 'react';
import PageTemplate from '../../template/PageTemplate';
import { Longos } from '../../../redux/modules/longos';
import LongoList from '../../molecules/LongoList';
import AddDialog from '../../molecules/AddDialog';
import UpdateDialog from '../../molecules/UpdateDialog';
import RemoveDialog from '../../molecules/RemoveDialog';
import SnackBar from '../../atoms/SnackBar';
import { AuthStatus } from '../../../modules/getAuthStatus';
import Const from '../../../modules/const';
import UnAuthrizedMessage from '../../molecules/UnauthrizedMessage';
import { AppFAB } from '../../molecules/AppButtonContainer';

type Props = {
    longos: Longos,
    appButtons: AppFAB[],
    authStatus: AuthStatus,
}


const About: React.FC<Props> = ({
    longos,
    appButtons,
    authStatus,
}) => {

    return (
        <PageTemplate appButtons={appButtons}>
          { authStatus === Const.AUTHSTATUS_ENOUGH 
            ? (
            <>
              <AddDialog />
              <UpdateDialog />
              <RemoveDialog/>
              <LongoList longos={longos} />
              <SnackBar />
            </>
          ) : <UnAuthrizedMessage authStatus={authStatus}/>
             }
        </PageTemplate>
    )
}

export default About;
