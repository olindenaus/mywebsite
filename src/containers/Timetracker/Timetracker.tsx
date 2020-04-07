import React, { useState } from 'react';
import { connect } from 'react-redux';

import { ITask } from './Tasks/ITask';

import * as actions from '../../store/actions';
import Modal from '../../components/UI/Modal/Modal';
import TaskCreator from './TaskManager/TaskCreator/TaskCreator';
import Summary from './Summary/Summary';
import Scale from './Scale/Scale';
import TaskManager from './TaskManager/TaskManager';
import Tasks from './Tasks/Tasks';
import './Timetracker.scss';

const Timekeeper = (props: any) => {

    const [showModal, setShowModal] = useState(false);
    const min = 0;

    const maxTime = Math.max.apply(Math, props.tasks.map((task: ITask) => {
        return task.timeSpent / 3600;
    }));

    const getMaxOnScale = () => {
        const x = Math.ceil(maxTime);
        return x % 2 === 0 ? x + 2 : x + 1;
    }
    const max = maxTime > 8 ? getMaxOnScale() : 8;

    const modal = showModal ?
        <Modal
            handleClose={() => setShowModal(false)}
            show={showModal}
        ><TaskCreator handleClose={() => setShowModal(false)} />
        </Modal> : null;


    const onSave = () => {
        console.log("tasks: ", props.tasks);
        console.log("token", props.authToken);        
        props.onSaveTasks(props.tasks, props.authToken);
    }
    return (
        <div className="timetracker">
            <h1>Timetracker</h1>
            {modal}
            <Scale max={max} min={min}>
                <Tasks max={max} />
                <Summary />
                <TaskManager clicked={() => setShowModal(true)} />
            </Scale>
            {/* <button onClick={onSave}>Test save</button> */}
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        tasks: state.timetracker.tasks,
        authToken: state.auth.token,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSaveTasks: (tasks: ITask[], token: string) => dispatch(actions.saveUserTasks(tasks, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timekeeper);