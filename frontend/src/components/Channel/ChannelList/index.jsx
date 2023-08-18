import './ChannelList.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchServer } from '../../../store/server';
import { useEffect } from 'react';

const ChannelList = ({ serverId }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (serverId != '@me') dispatch(fetchServer(serverId))
    }, [dispatch, serverId]);

    const server = useSelector(state => state.servers[serverId])

    return (
        <div className='channel-list'>
            <div className="server-top-name">
            {serverId === '@me' ? 'user home' : server?.name }
            </div>
            <div className="channels-actual-list">

            </div>
        </div>
    )
}

export default ChannelList