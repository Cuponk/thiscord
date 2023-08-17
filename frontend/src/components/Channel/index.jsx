import React from 'react';
import './Channel.css';
import ServerList from '../ServerList';
import { useParams } from 'react-router-dom';
import ChannelWindow from './ChannelWindow';


const Channel = () => {
    const { serverId } = useParams();

    return (
        <div className='channel-all'>
            <ServerList />
            <div className='channel-list'>
                <div className="server-name">

                </div>
                <div className="channels-actual-list">
                
                </div>
            </div>
            <ChannelWindow serverId={serverId} />
        </div>
    )
}

export default Channel;