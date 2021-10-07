import React from "react";
import { UserMenu, MenuItemLink } from "react-admin";
import SettingsIcon from "@material-ui/icons/Settings";

const MyUserMenu = (props) => {
    const userName = localStorage.getItem('userName');
    return (
        <div className="textCentered">
            <UserMenu {...props}>
                <MenuItemLink
                    to="/my-profile"
                    primaryText="My Profile"
                    leftIcon={<SettingsIcon />}
                />
                {userName}
            </UserMenu>
            {userName}
        </div>
    );
};

export default MyUserMenu;