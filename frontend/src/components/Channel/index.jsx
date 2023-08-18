import React from 'react';
import './Channel.css';
import ServerList from '../ServerList';
import { useParams } from 'react-router-dom';
import ChannelWindow from './ChannelWindow';
import { useState } from 'react';
import ServerModal from './ServerModal';
import ChannelList from './ChannelList'



const Channel = () => {
    const [showModal, setShowModal] = useState(false);
    const { serverId } = useParams();

    return (
        <>
            <ServerModal showModal={showModal} setShowModal={setShowModal}/>
            <div className='channel-all'>
                <ServerList setShowModal={setShowModal}/>
                <ChannelList serverId={serverId}/>
                <ChannelWindow serverId={serverId} />
            </div>
        </>
    )
}

export default Channel;