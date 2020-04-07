import React, { lazy, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Layout from './components/UI/Layout/Layout';
import WorldMapView from './containers/WorldMap/WorldMapView';
import Spinner from './components/UI/Spinner/Spinner';
import * as actions from './store/actions/index';
import './App.scss';

const TimeTracker = lazy(() => { return import('./containers/Timetracker/Timetracker'); });
const Auth = lazy(() => { return import('./auth/Auth'); });
const LogsHistory = lazy(() => { return import('./containers/LogsHistory/LogsHistory'); });
const SongOfADay = lazy(() => { return import('./containers/SongOfADay/SongOfADay'); });

const App = (props: any) => {

  useEffect(() => {
    props.onTryAutoSignup()
  }, []);

  const routes = (
    <Switch>
      <Route path='/map' component={WorldMapView} />
      <Route path='/timekeeper' component={TimeTracker} />
      <Route path='/song' component={SongOfADay} />
      <Route path='/login' component={Auth} />
      <Route path='/logs' component={LogsHistory} />
      <Route path='/' component={WorldMapView} />
      <Redirect to='/' />
    </Switch>
  );
  return (
    <Layout>
      <React.Suspense fallback={<Spinner />}>
        {routes}
      </React.Suspense>
    </Layout>
  );
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));