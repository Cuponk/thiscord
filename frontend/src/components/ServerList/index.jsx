import React, { useEffect } from 'react';
import './ServerList.css';
import ServerItem from './ServerItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServers } from '../../store/server';
import { ReactComponent as AddButton } from '../../assets/plus-server.svg'
import {ReactComponent as UserProfile } from '../../assets/profile-logo.svg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ServerList = ({ setShowModal }) => {
    const history = useHistory()
    const servers = useSelector(state => Object.values(state.servers));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchServers());
    }, [dispatch]);


    return (
        <ul className='server-list'>
            <button className='server-item' onClick={() => history.push('/channels/@me')}>
                <UserProfile className='user-profile-icon'/>
            </button>
            <div className="line"></div>
            {servers.map(server => (<ServerItem key={server.id} server={server} />))}
            <button onClick={() => setShowModal(true)} className='add-server'><AddButton className='add-server-icon'/></button>
        </ul>
    )
}

export default ServerList;