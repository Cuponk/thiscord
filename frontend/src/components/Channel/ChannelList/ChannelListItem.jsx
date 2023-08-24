import {ReactComponent as Hashtag} from '../../../assets/hashtag.svg' 
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const ChannelListItem = ({ channel }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/channels/${channel.serverId}/${channel.id}`)
    }
    return (
            <li key={channel.id}>
                <button onClick={handleClick} className="channel-actual-title"> <Hashtag className='channels-list-header-hashtag'/>{channel.name}</button>
            </li>
    )
}

export default ChannelListItem;