import './ServerList.css'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ServerItem = ({ server }) => {
    const history = useHistory();
    const channel = useSelector(state => state.channels);
    
    const handleChange = () => {
        history.push(`/channels/${server.id}`);
    }

    return (
        <li onClick={handleChange}>
            {/* {console.log(channel)} */}
            <button className="server-item">
                {server.photoUrl ? <img className='server-item-icon' src={server.photoUrl} alt="" /> : <div className='server-id'>{server.id}</div>}
            </button>
        </li>
    )
}

export default ServerItem;