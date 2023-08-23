import React from 'react';
import './Channel.css';
import ServerList from '../ServerList';
import { useParams } from 'react-router-dom';
import ChannelWindow from './ChannelWindow';
import { useState } from 'react';
import ServerModal from './ServerModal';
import ChannelList from './ChannelList'
import ChannelModal from './ChannelModal';



const Channel = () => {
    const [showModal, setShowModal] = useState(false);
    const [showChannelModal, setShowChannelModal] = useState(false);
    return (
        <>
            <ServerModal showModal={showModal} setShowModal={setShowModal}/>
            <ChannelModal showChannelModal={showChannelModal} setShowChannelModal={setShowChannelModal}/>
            <div className='channel-all'>
                <ServerList setShowModal={setShowModal}/>
                <ChannelList setShowModal={setShowChannelModal}/>
                <ChannelWindow />
            </div>
        </>
    )
}

export default Channel;