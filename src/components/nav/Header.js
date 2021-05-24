import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
import { HomeOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined, ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import firebase from 'firebase';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Search from '../forms/Search';

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home');

    let dispatch = useDispatch();
    let { user, cart } = useSelector((state) => ({ ...state }));

    let history = useHistory();

    const handleClick = (e) => {

        setCurrent(e.key);

    };

    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        history.push('/login');
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to="/">בית</Link>
            </Item>

            <Item key="shop" icon={<ShoppingOutlined />}>
                <Link to="/shop">חנות</Link>
            </Item>

            <Item key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">
                    <Badge count={cart.length} offset={[9, 0]}>
                        סל קניות
                    </Badge>
                </Link>
            </Item>

            {!user && (
                <Item key="register" icon={<UserAddOutlined />} className="float-right">
                    <Link to="/register">הרשמה</Link>
                </Item>
            )}

            {!user && (
                <Item key="login" icon={<UserOutlined />} className="float-right">
                    <Link to="/login">התחברות</Link>
                </Item>
            )}

            {user && (
                <SubMenu
                    key="SubMenu"
                    icon={<SettingOutlined />}
                    title={user.email && user.email.split('@')[0]}
                    className="float-right">
                    {user && user.role === 'subscriber' && (
                        <Item>
                            <Link to="/user/history">דשבורד</Link>
                        </Item>
                    )}

                    {user && user.role === 'admin' && (
                        <Item>
                            <Link to="/admin/dashboard">דשבורד</Link>
                        </Item>
                    )}
                    <Item icon={<LogoutOutlined />} onClick={logout}>התנתקות</Item>
                </SubMenu>
            )}

            <span className='float-right p-1'>
                <Search />
            </span>
        </Menu>

    );
};

export default Header;