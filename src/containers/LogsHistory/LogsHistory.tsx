import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Groups from './Groups/Groups';
import './LogsHistory.scss';

export type tGroup = { country: string | any, logs: any[], startTime: number, endTime: number };
type tLocation = { country: string, timestamp: number, latitude: number, longitude: number };

export const LogsHistory = (props: any) => {

    useEffect(() => {
        props.onFetchLocationLogs();
    }, []);

    // const countries = [...new Set(Object.keys(props.locations).map((id: any) => props.locations[id].country))];

    const groupByCountriesAndDate = () => {
        const locations = Object.keys(props.locations).map((id: any) => {
            return props.locations[id];
        });
        let currentCountry = '';
        let currentGroup: tGroup = {
            startTime: 0,
            endTime: 0,
            country: '',
            logs: []
        };
        let groups: tGroup[] = [];
        for (let i = 0; i < locations.length; i++) {
            const location = locations[i];
            const country = location.country;
            if (country !== currentCountry) {
                addNewGroup(groups);
                currentCountry = country;
                currentGroup = groups[groups.length - 1];
                currentGroup.startTime = location.timestamp;
                currentGroup.country = location.country;
                currentGroup.logs.push(location);
            } else {
                currentGroup.logs.push(location);
            }
        }
        return groups;
    };

    const addNewGroup = (groups: tGroup[]) => {
        groups.push({
            startTime: 0,
            endTime: 0,
            country: '',
            logs: []
        });
    }

    let groups = <Groups groups={groupByCountriesAndDate} />;

    if (props.loading) {
        groups = <Spinner />
    }

    let errorMessage = null;

    if (props.error !== '') {
        errorMessage = (
            <p>{props.error}</p>
        )
    }

    return (
        <div className={"locations-history"}>
            <div className={"logs-container"}>
                {groups}
                {errorMessage}
            </div>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        locations: state.logs.locations,
        loading: state.logs.loading,
        error: state.logs.errorMessage
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchLocationLogs: () => dispatch(actions.fetchLocations())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogsHistory);