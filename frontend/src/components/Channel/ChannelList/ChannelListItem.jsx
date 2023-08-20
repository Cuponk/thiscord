import {ReactComponent as Hashtag} from '../../../assets/hashtag.svg' 

const ChannelListItem = ({ channel }) => {
    return (
        <div className="channel-list-base">
            <Hashtag className='channels-list-header-hashtag'/>
            <li key={channel.id}>
                <p className="channel-actual-title">{channel.name}</p>
            </li>
        </div>
    )
}

export default ChannelListItem;