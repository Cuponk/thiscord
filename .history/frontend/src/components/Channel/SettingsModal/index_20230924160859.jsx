import React from "react";
import "./index.css";
import * as channelActions from "../../../store/channel";
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { ReactComponent as CloseButton } from "../../../assets/close.svg";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteChannel } from "../../../store/channel";

const SettingsModal = ({ panel, setPanel }) => {
    const [channelName, setChannelName] = useState("");
    const history = useHistory();
    const { serverId } = useParams();
    const dispatch = useDispatch();
    const channelId = useSelector((state) => state.channels[serverId]?.[0]?.id);
    const server = useSelector((state) => state.servers[serverId]);
    const currentUserId = useSelector((state) => state.session.user.id);
    useEffect(() => {
        dispatch(sessionActions.restoreSession());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name: channelName,
        };
        if (server.ownerId === currentUserId) {
            dispatch(channelActions.createChannel(payload, serverId));
            setPanel([false, ""]);
            history.push(`/channels/${serverId}/${channelId}`);
        } else {
            alert("Only the server owner can create channels");
        }
    };

    const handleDelete = () => {
        dispatch(deleteChannel(serverId, channelId));
        if (channelId === panel[1]) {
            history.push(`/channels/${serverId}`);
        }
    };

    return (
        <div className="modal-base">
            {panel[0] && (
                <div
                    className="settings-modal"
                    onClick={() => setPanel([false, ""])}
                >
                    <div
                        className="settings-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="settings-modal-header">
                            <h2 className="modal-title">
                                {panel[2] + " Settings"}
                            </h2>
                            <CloseButton
                                className="close"
                                onClick={() => setPanel([false, ""])}
                            />
                        </div>
                        <div className="settings-modal-body">
                            <form className="modal-form">
                                <div className="settings-name-base">
                                    <label className="settings-form-name">
                                        CHANNEL NAME
                                    </label>
                                    <input
                                        className="settings-name-input"
                                        type="text"
                                        placeholder="#channel-name"
                                        value={channelName}
                                        onChange={(e) =>
                                            setChannelName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="bottom-submit">
                                    <button
                                        className="submit-button"
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => handleDelete}
                                        className="submit-button"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsModal;
