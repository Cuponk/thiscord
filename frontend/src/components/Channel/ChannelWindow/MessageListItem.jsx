import '../Channel.css'
import Default from '../../../assets/default.webp'

const MessageListItem = ({ message }) => {   
    return (
        <div className="message-list-item">
            <img className="message-list-pic" src={Default} alt="" />
            <div className="message-list-text">
                <p className="message-list-username">{message.authorName}</p>
                <p className="message-list-body">{message.body}</p>
            </div>
        </div>
    )
}

export default MessageListItem;