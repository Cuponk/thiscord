import './ServerList.css'

const ServerItem = ({ server }) => {
    return (
        <li>
            <div className="server-item">
                {server.id}
            </div>
        </li>
    )
}

export default ServerItem;