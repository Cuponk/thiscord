import {ReactComponent as Hashtag} from '../../../assets/hashtag.svg' 
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const ChannelListItem = ({ channel }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/channels/${channel.serverId}/${channel.id}`)
    }
    return (
        <div className="channel-list-base">
            <Hashtag className='channels-list-header-hashtag'/>
            <li key={channel.id}>
                <button onClick={handleClick} className="channel-actual-title">{channel.name}</button>
            </li>
        </div>
    )
}

export default ChannelListItem;