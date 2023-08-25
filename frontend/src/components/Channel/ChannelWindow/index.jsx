import React from 'react';
import '../Channel.css';
import UserHome from './UserHome';
import ServerHome from './ServerHome';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchChannel } from '../../../store/channel';
import { ReactComponent as Hashtag } from '../../../assets/hashtag.svg';
import { fetchMembers } from '../../../store/user';
import ExploreHome from './ExploreHome';
import Profile from '../../../assets/default.webp';

const ChannelWindow = () => {
    const dispatch = useDispatch();
    const { serverId, channelId } = useParams();

    useEffect(() => {
        if ((channelId && serverId !== '@me') && (channelId && serverId !== '@explore')) {
            dispatch(fetchChannel(serverId, channelId))
        }
    }, [dispatch, serverId, channelId]);

    useEffect(() => {
        if ((channelId && serverId !== '@me') && (channelId && serverId !== '@explore')) {
            dispatch(fetchMembers(serverId))
        }
    }, [serverId, channelId, dispatch]);

    const users = useSelector(state => Object.values(state.users))
    const channel = useSelector(state => state.channels[channelId])
    if (!channel) {
        return (
            null
        )
    }

    const whichHome = () => {
        switch (serverId) {
            case '@me':
                return <UserHome />
            case 'explore':
                return <ExploreHome />
            default:
                return <ServerHome />
        }
    }
    return (
        <div className="channel-window">
            <div className="channel-name">
                <Hashtag className='channel-hash'/><h1 className='channel-name-name'>{channel.name}</h1>
            </div>
                <div className="channel-main">
                    <div className='chat-window'>
                        {whichHome()}
                    </div>
                    <div className='user-list'>
                        {users.map((i) => 
                            <div className='why'>
                                <img src={Profile} className='why-image' />
                                <p className='user-list-name'>{i.username}</p>
                            </div>
                        )}
                    </div>
                </div>  
        </div>
    )
}

export default ChannelWindow;