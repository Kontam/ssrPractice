import React from 'react';
import { AuthStatus } from '../../../modules/useAuthStatus';
import Const from '../../../modules/const';
import { Typography } from '@material-ui/core';

type Props = {
  authStatus: AuthStatus
}

const UnAuthrizedMessage: React.FC<Props> = ({ authStatus }) => {

  let message = "";
  switch(authStatus) {
    case Const.AUTHSTATUS_NOT_ENOUGH:
      message = "このページを見るための権限がありません"
      break;
    case Const.AUTHSTATUS_UNAUTHRIZED:
      message = "ログインが必要なページです"
      break;
  }

  return (
    <div> 
      <Typography variant="h5">{message}</Typography>
    </div>
  )
}

export default UnAuthrizedMessage;
