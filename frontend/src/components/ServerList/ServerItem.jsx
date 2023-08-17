import './ServerList.css'
import { useHistory } from 'react-router-dom';

const ServerItem = ({ server }) => {
    const history = useHistory();
    
    const handleChange = () => {
    }

    return (
        <li onClick={handleChange}>
            <div className="server-item">
                {server.id}
            </div>
        </li>
    )
}

export default ServerItem;