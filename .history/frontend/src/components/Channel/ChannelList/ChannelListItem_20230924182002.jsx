import { ReactComponent as Hashtag } from "../../../assets/hashtag.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { deleteChannel } from "../../../store/channel";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ReactComponent as Settings } from "../../../assets/settings.svg";
import { useEffect } from "react";

const ChannelListItem = ({ channel, setPanel, panel }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { channelId } = useParams();

    const handleClick = () => {
        history.push(`/channels/${channel.serverId}/${channel.id}`);
    };

    useEffect(() => {
        // Check if the panel state is updated
    }, [panel]);

    return (
        <li className="channel-yup-item" key={channel.id}>
            <button onClick={handleClick} className="channel-actual-title">
                {" "}
                <Hashtag className="channels-list-header-hashtag" />
                {channel.name}
            </button>

            <button
                className="channel-settings-button"
                onClick={() => {
                    setPanel([true, channel.id, "Channel"]);
                }}
            >
                <Settings className="settings-icon" />
            </button>
        </li>
    );
};

export default ChannelListItem;
