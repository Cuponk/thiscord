import React from 'react';
import '../Channel.css';
import UserHome from './UserHome';
import ServerHome from './ServerHome';

const ChannelWindow = ({ serverId }) => {
    return (
        <div className="channel-window">
            <div className="channel-name">

            </div>
                <div className="channel-main">
                    <div className='chat-window'>
                        {serverId === '@me' ? <UserHome /> : <ServerHome serverId={serverId} />}
                    </div>
                    <div className='user-list'>
                
                    </div>
                </div>  
        </div>
    )
}

export default ChannelWindow;