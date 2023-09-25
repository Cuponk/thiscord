import React from "react";

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
            setShowChannelModal(false);
            history.push(`/channels/${serverId}/${channelId}`);
        } else {
            alert("Only the server owner can create channels");
        }
    };

    return (
        <div className="modal-base">
            {setPanel[0] && (
                <div
                    className="settings-modal"
                    onClick={() => setPanel([false, ""])}
                >
                    <div
                        className="settings-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="settings-modal-header">
                            <h2 className="modal-title">Create settings</h2>
                            <CloseButton
                                className="close"
                                onClick={() => setPanel([false, ""])}
                            />
                        </div>
                        <div className="settings-modal-body">
                            <form
                                className="modal-form"
                                onSubmit={handleSubmit}
                            >
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
                                        Create
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