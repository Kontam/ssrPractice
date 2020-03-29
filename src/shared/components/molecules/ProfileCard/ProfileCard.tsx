import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TableContainer, TableBody, TableRow, TableCell, Table } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { UserInfo } from '../../../redux/modules/userInfo';
import { Login } from '../../../redux/modules/login';

const Container = styled.div<{loggedIn: boolean}>`
  display: ${props => props.loggedIn ? "block" : "none"} 
`;

const useStyles = makeStyles((theme :Theme) => 
  createStyles({
    root: {
      maxWidth: 600,
    },
    table: {
      width: '90%',
    }
  }
));

export type RowData = {
  name: string,
  data: string,
}

export type ProfileCardProps = {
  tableData: RowData[],
  userInfo: UserInfo,
  login: Login,
  handleLogout: () => void,
}

const ProfileCard: React.FC<ProfileCardProps> = ({ tableData, userInfo, login, handleLogout }) => {
  const classes = useStyles();
  return (
    <Container loggedIn={login.loggedIn}>
      <Card className={classes.root}>
        <CardHeader
          title={userInfo.displayName}
          avatar={
            <Avatar alt="x" src={userInfo.photoURL} /> 
          }
          action={
            <Tooltip title="ログアウト" enterDelay={50}>
              <IconButton onClick={handleLogout}>
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <CardContent>
          <TableContainer className={classes.table}>
            <Table>
              <TableBody>
                {
                  tableData.map((rowData) => (
                    <TableRow key={rowData.name}>
                      <TableCell align="right">{rowData.name}</TableCell>
                      <TableCell align="left">{rowData.data}</TableCell>
                    </TableRow>
                  ))             
                }
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProfileCard;
