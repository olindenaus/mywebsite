import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

export const NavigationLinks = (props: any) => {

    return (
        <>
            <NavLink to="/" exact>Map</NavLink>
            <NavLink to="/timekeeper">TimeTracker</NavLink>
            <NavLink to="/song">Song of a Day</NavLink>
            <NavLink to="/login">Login</NavLink>           
        </>
    )
};

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(NavigationLinks);