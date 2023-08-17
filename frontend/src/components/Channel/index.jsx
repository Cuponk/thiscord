import React from 'react';
import './Channel.css';
import ServerList from '../ServerList';
import { useParams } from 'react-router-dom';
import ChannelWindow from './ChannelWindow';
import { useState } from 'react';
import ServerModal from './ServerModal';


const Channel = () => {
    const [showModal, setShowModal] = useState(false);
    const { serverId } = useParams();

    return (
        <>
            <ServerModal showModal={showModal} setShowModal={setShowModal}/>
            <div className='channel-all'>
                <ServerList setShowModal={setShowModal}/>
                <div className='channel-list'>
                    <div className="server-name">
                    </div>
                    <div className="channels-actual-list">
            
                    </div>
                </div>
                <ChannelWindow serverId={serverId} />
            </div>
        </>
    )
}

export default Channel;