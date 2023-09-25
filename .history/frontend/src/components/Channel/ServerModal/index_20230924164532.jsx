import "./ServerModal.css";
import * as serverActions from "../../../store/server";
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ReactComponent as CloseButton } from "../../../assets/close.svg";
import { ReactComponent as UploadImage } from "../../../assets/upload.svg";

const ServerModal = ({ showModal, setShowModal }) => {
    const dispatch = useDispatch();
    const [serverPhoto, setServerPhoto] = useState(null);
    const [imgData, setImgData] = useState(null);

    const sessionUser = useSelector((state) => state.session.user);
    const [serverName, setServerName] = useState(
        `${sessionUser?.username}'s server`
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("server[name]", serverName);
        formData.append("server[owner_id]", sessionUser.id);
        if (serverPhoto) formData.append("server[photo]", serverPhoto);
        dispatch(serverActions.createServer(formData));
        setShowModal(false);
    };

    const handlefile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setServerPhoto(file);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="modal-base">
            {showModal && (
                <div
                    className="server-modal"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="server-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="server-modal-header">
                            <div className="top-half">
                                <h2 className="modal-title">
                                    Customize your server
                                </h2>
                                <CloseButton
                                    className="close-server"
                                    onClick={() => setShowModal(false)}
                                />
                            </div>
                            <p className="modal-text">
                                Give your new server a personality with a name
                                and an icon, you can always change it later
                            </p>
                        </div>
                        <div className="server-modal-body">
                            <form
                                className="modal-form"
                                onSubmit={handleSubmit}
                            >
                                <label className="upload-label">
                                    <UploadImage className="upload-image" />
                                    <input
                                        className="upload-icon"
                                        type="file"
                                        onChange={handlefile}
                                    />
                                </label>
                                {/* <img className="actual-preview" src={imgData} alt="" /> */}
                                <div className="server-name-base">
                                    <label className="server-name">
                                        SERVER NAME
                                    </label>
                                    <input
                                        className="server-name-input"
                                        type="text"
                                        value={serverName}
                                        onChange={(e) =>
                                            setServerName(e.target.value)
                                        }
                                    />
                                    <p className="server-name-alert">
                                        By creating a server, you agree to
                                        Thiscord's{" "}
                                        <span className="guidelines">
                                            Community Guidelines
                                        </span>
                                    </p>
                                </div>
                                <div className="bottom-submit-server">
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

export default ServerModal;
