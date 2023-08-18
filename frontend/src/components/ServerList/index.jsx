import React, { useEffect } from 'react';
import './ServerList.css';
import ServerItem from './ServerItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServers } from '../../store/server';
import { ReactComponent as AddButton } from '../../assets/plus-server.svg'

const ServerList = ({ setShowModal }) => {
    const servers = useSelector(state => Object.values(state.servers));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchServers());
    }, [dispatch]);


    return (
        <ul className='server-list'>
            {servers.map(server => (<ServerItem key={server.id} server={server} />))}
            <button onClick={() => setShowModal(true)} className='add-server'><AddButton className='add-server-icon'/></button>
        </ul>
    )
}

export default ServerList;