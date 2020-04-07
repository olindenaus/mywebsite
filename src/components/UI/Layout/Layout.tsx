import React, { useState } from 'react';
import Media from 'react-media';

import Burger from '../Toolbar/Burger/Burger';
import NavigationLinks from '../Toolbar/ToolbarNavigation/ToolbarNavigation';

import Backdrop from '../Backdrop/Backdrop';
import SideNav from '../Toolbar/SideNav/SideNav';
import './Layout.scss';

const Layout = (props: any) => {

    const [sideWidth, setSideWidth] = useState('0');
    const [showBackdrop, setShowBackdrop] = useState(false);

    const burgerClicked = () => {
        if (sideWidth === '0') {
            setSideWidth('250px');
            setShowBackdrop(true);
        } else {
            setSideWidth('0');
        }
    }

    const handleSideNavClose = () => {
        setSideWidth('0');
        setShowBackdrop(false);
    }

    const navigation = (
        <Media query="(max-width: 800px)">
            {matches =>
                matches ? (<><Burger clicked={burgerClicked} />
                    <Backdrop show={showBackdrop} clicked={handleSideNavClose}/>  
                    <SideNav width={sideWidth} closeClicked={handleSideNavClose} />
                </>)
                    : <NavigationLinks />}
        </Media>
    )

    const intViewportHeight = window.innerHeight;

    return (
        <div className="layout" style={{ minHeight: intViewportHeight }}>
            <div className="toolbar">
                {navigation}
            </div>
            <div className="content">{props.children}</div>
            <div className="footer">Oskar Lindenau - {new Date().getFullYear()}</div>
        </div>
    )
};
export default Layout;