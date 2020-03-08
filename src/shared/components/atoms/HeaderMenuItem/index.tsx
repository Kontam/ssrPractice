import React from 'react';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import { NavMenu } from '../../molecules/Header';
import styled from 'styled-components';

const Item = styled.li`
    list-style: none;
    margin-right: 30px;
    
    :hover {
        background-color: rgba(255, 255, 255, .3);
    }
`;

const HeaderMenuItem: React.FC<{ menu: NavMenu }> = ({ menu }) => {

    return (
        <Item>
            <Tooltip title={menu.description} placement="bottom-start">
                <Link to={menu.href}>
                    <Typography variant="h6" color="initial">{menu.text}</Typography>
                </Link>
            </Tooltip>
        </Item>
    );
}

export default HeaderMenuItem;