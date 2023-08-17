import '../Channel.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchServer } from '../../../store/server';

const ServerHome = ({ serverId }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchServer(serverId))
    }, [dispatch, serverId]);

    const server = useSelector(state => state.servers[serverId])
    if (!server) {
        return (
            null
        )
    }
    return (

        <div>
            <h1>Server Home</h1>
            <h1>{server.name}</h1>
        </div>
    )
}

export default ServerHome;