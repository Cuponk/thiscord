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
                {server.id}
            </button>
        </li>
    )
}

export default ServerItem;