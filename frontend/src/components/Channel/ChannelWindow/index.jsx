import React from 'react';
import '../Channel.css';
import UserHome from './UserHome';
import ServerHome from './ServerHome';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchChannel } from '../../../store/channel';
import { fetchUsers } from '../../../store/user';
import { ReactComponent as Hashtag } from '../../../assets/hashtag.svg';

const ChannelWindow = () => {
    const dispatch = useDispatch();
    const { serverId, channelId } = useParams();

    useEffect(() => {
        if (channelId && serverId !== '@me') {
            dispatch(fetchChannel(serverId, channelId))
        }
    }, [dispatch, serverId, channelId]);

    const users = useSelector(state => state.users)
    const channel = useSelector(state => state.channels[channelId])
    if (!channel) {
        return (
            null
        )
    }

    return (
        <div className="channel-window">
            <div className="channel-name">
                <Hashtag className='channel-hash'/><h1 className='channel-name-name'>{channel.name}</h1>
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