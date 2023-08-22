import React from 'react';
import '../Channel.css';
import UserHome from './UserHome';
import ServerHome from './ServerHome';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchChannel } from '../../../store/channel';

const ChannelWindow = () => {
    const dispatch = useDispatch();
    const { serverId, channelId } = useParams();


    useEffect(() => {
        dispatch(fetchChannel(serverId, channelId))
            .catch(err => console.log(err))
    }, [dispatch, serverId, channelId]);

    const server = useSelector(state => state.servers[serverId])
    const channel = useSelector(state => state.channels[channelId])
    if (!channel) {
        return (
            null
        )
    }

    return (
        <div className="channel-window">
            <div className="channel-name">
                <h1>{channel.name}</h1>
            </div>
                <div className="channel-main">
                    <div className='chat-window'>
                        {serverId === '@me' ? <UserHome /> : <ServerHome/>}
                    </div>
                    <div className='user-list'>
                
                    </div>
                </div>  
        </div>
    )
}

export default ChannelWindow;