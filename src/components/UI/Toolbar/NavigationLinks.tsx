import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

export const NavigationLinks = (props: any) => {

    let logButton = <NavLink to="/login">Login</NavLink>;

    if (props.isAuthenticated) {
        logButton = (
            <>
                <a style={{cursor: "pointer"}} onClick={props.logout}>Logout</a>
            </>
        )
    }

    return (
        <>
            <NavLink to="/" exact>Map</NavLink>
            <NavLink to="/timekeeper">TimeTracker</NavLink>
            <NavLink to="/song">Song of a Day</NavLink>
            {logButton}
        </>
    )
};

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationLinks);