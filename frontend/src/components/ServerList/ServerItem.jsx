import './ServerList.css'
import { useHistory } from 'react-router-dom';

const ServerItem = ({ server }) => {
    const history = useHistory();
    
    const handleChange = () => {
        history.push(`/channels/${server.id}`);
    }

    return (
        <li onClick={handleChange}>
            <button className="server-item">
                {server.photoUrl ? <img className='server-item-icon' src={server.photoUrl} alt="" /> : <div className='server-id'>{server.id}</div>}
            </button>
        </li>
    )
}

export default ServerItem;