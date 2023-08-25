import React from 'react';
import '../Channel.css';
import UserHome from './UserHome';
import ServerHome from './ServerHome';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchChannel } from '../../../store/channel';
import { ReactComponent as Hashtag } from '../../../assets/hashtag.svg';
import { fetchMembers, resetMembers } from '../../../store/user';
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
        if (channelId && serverId !== '@me' ) {
            dispatch(resetMembers())
            dispatch(fetchMembers(serverId))
        }
        return () => {
            dispatch(resetMembers())
        }
    }, [serverId, channelId, dispatch]);

    const users = useSelector(state => Object.values(state.users))
    const channel = useSelector(state => state.channels[channelId])

    const whichHome = () => {
        switch (serverId) {
            case '@me':
                return (
                    <div className='chat-window'>
                        <UserHome />
                    </div>
                )
            case 'explore':
                return (
                    <div className='chat-window'>
                        <ExploreHome />
                    </div>
                )
            default:
                return (
                    <div className='chat-window-chat'>
                        <ServerHome />
                    </div>
                )
        }
    }
    return (
        <div className="channel-window">
            <div className="channel-name">
                <Hashtag className='channel-hash'/><h1 className='channel-name-name'>{channel ? channel.name : 'Explore'}</h1>
            </div>
                <div className="channel-main">
                    {whichHome()}
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