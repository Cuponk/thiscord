import "./ChannelList.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannels, resetChannels } from "../../../store/channel";
import { fetchServer } from "../../../store/server";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChannelListItem from "./ChannelListItem";
import { ReactComponent as AddChannel } from "../../../assets/plus-channel.svg";

const ChannelList = ({ setShowModal, setPanel, panel }) => {
    const { serverId, UserId } = useParams();
    const channels = useSelector((state) => Object.values(state.channels));
    const dispatch = useDispatch();

    useEffect(() => {
        if (serverId !== "@me" && serverId !== "explore") {
            dispatch(resetChannels());
            dispatch(fetchServer(serverId));
            dispatch(fetchChannels(serverId));
        }
        return () => {
            dispatch(resetChannels());
        };
    }, [dispatch, serverId]);

    const server = useSelector((state) => state.servers);
    // const members = useSelector(state => Object.values(state.servers.members))
    console.log(server[serverId].name);
    return (
        <div className="channel-list">
            <div className="server-top-name">server[serverId].name</div>
            <div className="channels-actual-list">
                <ul>
                    {serverId !== "explore" && (
                        <div className="channels-list-header">
                            <div className="channels-list-header-name">
                                TEXT CHANNELS
                            </div>
                            <button
                                onClick={() => setShowModal(true)}
                                className="channels-list-header-add-button"
                            >
                                <AddChannel className="add-channel-icon" />
                            </button>
                        </div>
                    )}
                    <div className="channels-list-base">
                        {channels.map((el) => (
                            <ChannelListItem
                                key={el.id}
                                channel={el}
                                setPanel={setPanel}
                                panel={panel}
                            />
                        ))}
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default ChannelList;
