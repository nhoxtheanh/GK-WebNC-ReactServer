import React, { memo } from 'react';
//import { StyledHeader } from './styles';
import Menu from '../../Components/Menu';

export const Header = () => {
  return (
    <header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">Dashboard</Menu.Item>
        <Menu.Item key="2">Account</Menu.Item>
        <Menu.Item key="3">Something...</Menu.Item>
      </Menu>
    </header>
  );
};

export default memo(Header);
