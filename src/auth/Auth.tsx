import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../components/UI/Spinner/Spinner';

import './Auth.scss';
import * as actions from '../store/actions/index';
import Summary from '../containers/Timetracker/Summary/Summary';

const Auth = (props: any) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);

    const updateLogin = (e: any) => {
        setLogin(e.target.value);
    }

    const updatePassword = (e: any) => {
        setPassword(e.target.value);
    }

    const submitHandler = (event: any) => {
        event.preventDefault();
        props.onAuth(login, password, isSignup);
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to="/admin" />
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    };

    let submitText = 'Log In';
    let switchText = 'Sign Up';
    if (isSignup) {
        submitText = 'Sign Up';
        switchText = 'Log In';
    }

    let form = (
        <>
            <div className="input-wrapper">
                Login
            <input type="email" value={login} onChange={updateLogin} />
                <span className="underline"></span>
            </div>
            <div className="input-wrapper">
                Password
            <input type="password" value={password} onChange={updatePassword} />
                <span className="underline"></span>
            </div>
            {errorMessage}
            <div className="switch" onClick={() => setIsSignup(!isSignup)}>Switch to {switchText}</div>
            <button className="submit-button">{submitText}</button>
        </>
    );

    if (props.loading) {
        form = <Spinner />
    }

    return (
        <div className="auth-form">
            {authRedirect}
            <form onSubmit={submitHandler}>
                {form}
            </form>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.auth.token !== null,
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAuth: (email: string, password: string, isSignup: boolean) => dispatch(actions.auth(email, password, isSignup))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);