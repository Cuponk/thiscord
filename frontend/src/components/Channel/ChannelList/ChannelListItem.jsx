import {ReactComponent as Hashtag} from '../../../assets/hashtag.svg' 
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch } from 'react-redux';
import { deleteChannel } from '../../../store/channel';

const ChannelListItem = ({ channel }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = () => {
        history.push(`/channels/${channel.serverId}/${channel.id}`)
    }

    const handleDelete = () => {
        dispatch(deleteChannel(channel))
    }

    return (
            <li key={channel.id}>
                <button onClick={handleClick} className="channel-actual-title"> <Hashtag className='channels-list-header-hashtag'/>{channel.name}</button>
                <button onClick={handleDelete}>Delete</button>
            </li>
    )
}

export default ChannelListItem;