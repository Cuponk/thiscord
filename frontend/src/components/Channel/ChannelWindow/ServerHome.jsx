import '../Channel.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchChannel } from '../../../store/channel';
import { useParams } from 'react-router-dom';


const ServerHome = () => {
    const dispatch = useDispatch();
    const { serverId, channelId } = useParams();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('message sent')
    }


    useEffect(() => {
        dispatch(fetchChannel(serverId, channelId))
            .catch(err => console.log(err))
    }, [dispatch, serverId, channelId]);

    const server = useSelector(state => state.servers[serverId])
    const channel = useSelector(state => state.channels[channelId])
    if (!server) {
        return (
            null
        )
    }
    return (

        <>
            <div className="chat-bar">
                <form onSubmit={handleSubmit}>
                    <input className='chat-bar-input' type="text" placeholder={`Message #${channel.name}`}></input>
                </form>
            </div>
        </>
    )
}

export default ServerHome;