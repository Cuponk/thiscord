import './ChannelList.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels } from '../../../store/channel';
import { fetchServer } from '../../../store/server'
import { useEffect, useState } from 'react';

const ChannelList = ({ serverId }) => {
    const [channelsList, setChannelsList] = useState([])
    const channels = useSelector(state => Object.values(state.channels))
    const dispatch = useDispatch();

    useEffect(() => {
        if (serverId !== '@me') {
            dispatch(fetchServer(serverId));
            dispatch(fetchChannels());
        }
    }, [dispatch, serverId]);

    console.log(channels)
    // setChannelsList(channels.filter((val) => val.serverId === serverId))

    const server = useSelector(state => state.servers[serverId])

    return (
        <div className='channel-list'>
            <div className="server-top-name">
                {serverId === '@me' ? 'user home' : server?.name }
            </div>
            <div className="channels-actual-list">
                <ul>
                    {/* {channelsList.map((el) => (
                        <li>
                            {el.name}
                        </li>
                    ))} */}
                </ul>
            </div>
        </div>
    )
}

export default ChannelList