import React from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';

const Channel = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/');
    }

    return (
        <div>
            <h1>Channel</h1>
            <button onClick={handleLogout}>logout</button>
        </div>

    )
}

export default Channel;