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
import * as serverActions from "../../../store/server";

const SettingsModal = ({ panel, setPanel }) => {
    const [channelName, setChannelName] = useState("");
    const history = useHistory();
    const { serverId } = useParams();
    const dispatch = useDispatch();
    const channelId = useSelector((state) => state.channels[serverId]?.[0]?.id);
    const server = useSelector((state) => state.servers[serverId]);
    const currentUserId = useSelector((state) =>
        state.session.user ? state.session.user.id : null
    );

    useEffect(() => {
        dispatch(sessionActions.restoreSession());
    }, [dispatch]);

    useEffect(() => {}, [channelName]);

    const handleUpdateChannel = async (e) => {
        const payload = {
            name: channelName,
            serverId: serverId,
        };
        if (server.ownerId === currentUserId) {
            dispatch(channelActions.updateChannel(serverId, payload, panel[1]));
            setPanel([false, "", ""]);
        } else {
            alert("Only the server owner can create channels");
        }
    };

    const handleUpdateServer = async (e) => {
        const payload = {
            name: channelName,
        };
        if (server.ownerId === currentUserId) {
            dispatch(serverActions.updateServer(serverId, payload));
            setPanel([false, "", ""]);
        } else {
            alert("Only the server owner can create channels");
        }
    };

    const handleDeleteChannel = (e) => {
        e.preventDefault();

        if (server.ownerId === currentUserId) {
            dispatch(deleteChannel(serverId, panel[1]));
            if (channelId === panel[1]) {
                history.push(`/channels/${serverId}`);
            }
            setPanel([false, "", ""]);
        } else {
            alert("Only the server owner can delete channels");
        }
    };

    const handleDeleteServer = (e) => {
        e.preventDefault();

        if (server.ownerId === currentUserId) {
            dispatch(serverActions.deleteServer(serverId));
            history.push(`/channels/@me`);
            setPanel([false, "", ""]);
        } else {
            alert("Only the server owner can delete servers");
        }
    };

    return (
        <div className="modal-base">
            {panel[0] && (
                <div
                    className="settings-modal"
                    onClick={() => setPanel([false, "", ""])}
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
                                onClick={() => setPanel([false, "", ""])}
                            />
                        </div>
                        <div className="settings-modal-body">
                            <div className="modal-form">
                                <div className="settings-name-base">
                                    <label className="settings-form-name">
                                        {panel[2].toUpperCase()} NAME
                                    </label>
                                    <input
                                        className="settings-name-input"
                                        type="text"
                                        placeholder={
                                            "#" +
                                            panel[2].toLowerCase() +
                                            "-name"
                                        }
                                        value={channelName}
                                        onChange={(e) =>
                                            setChannelName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="bottom-submit">
                                    <button
                                        className="submit-button"
                                        onClick={
                                            panel[2] === "Channel"
                                                ? handleUpdateChannel
                                                : handleUpdateServer
                                        }
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={
                                            panel[2] === "Channel"
                                                ? handleDeleteChannel
                                                : handleDeleteServer
                                        }
                                        className="submit-button"
                                    >
                                        Delete {panel[2]}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsModal;
