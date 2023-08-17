import React from 'react';
import './Channel.css';
import ServerList from '../ServerList';
import { useParams } from 'react-router-dom';


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
            <div className="channel-window">
                <div className="channel-name">

                </div>
                <div className="channel-main">
                    <div className='chat-window'>
                    
                    </div>
                    <div className='user-list'>
                    
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default Channel;