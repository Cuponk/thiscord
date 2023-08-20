import './ChannelList.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels, resetChannels } from '../../../store/channel';
import { fetchServer } from '../../../store/server'
import { useEffect } from 'react';
import ChannelListItem from './ChannelListItem';
import { ReactComponent as AddChannel } from '../../../assets/plus-channel.svg'

const ChannelList = ({ serverId }) => {
    const channels = useSelector(state => Object.values(state.channels))
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (serverId !== '@me') {
            dispatch(resetChannels());
            dispatch(fetchServer(serverId));
            dispatch(fetchChannels(serverId));
        }
    }, [dispatch, serverId]);

    const server = useSelector(state => state.servers[serverId])

    return (
        <div className='channel-list'>
            <div className="server-top-name">
                {serverId === '@me' ? 'user home' : server?.name }
            </div>
            <div className="channels-actual-list">
                <ul>
                    <div className="channels-list-header">
                        <div className="channels-list-header-name">TEXT CHANNELS</div>
                        <button className="channels-list-header-add-button"><AddChannel className="add-channel-icon"/></button>
                    </div>
                    {channels.map((el) => (
                        <ChannelListItem channel={el} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ChannelList