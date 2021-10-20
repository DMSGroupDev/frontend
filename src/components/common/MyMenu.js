import React from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@material-ui/core";
import { MenuItemLink, getResources } from "react-admin";
import DefaultIcon from "@material-ui/icons/ViewList";
import SettingsIcon from "@material-ui/icons/Settings";
import DashboardIcon from "@material-ui/icons/Dashboard";
import strings from '../../localization/Localization.js'; 
import MyTheme from '../../components/common/MyTheme.js';

const MyMenu = ({ onMenuClick, logout }) => {
    const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("xs"));
    const open = useSelector((state) => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);
    return (
        <div>
            <MenuItemLink
                key={strings.dashboard}
                to="/"
                primaryText={strings.dashboard}
                leftIcon={<DashboardIcon style={{ fill: MyTheme.palette.secondary.main }}/>}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                exact
            />
            {resources.map((resource) => (
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={
                        (resource.options && resource.options.label) || resource.name
                    }
                    leftIcon={resource.icon ? <resource.icon style={{ fill: MyTheme.palette.secondary.main }} /> : <DefaultIcon style={{ fill: MyTheme.palette.secondary.main }} />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                />
            ))}

            <MenuItemLink
                key={strings.settings}
                to="/settings"
                primaryText={strings.settings}
                leftIcon={<SettingsIcon style={{ fill: MyTheme.palette.secondary.main }} />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
            {isXSmall && logout}
        </div>
    );
};

export default MyMenu;