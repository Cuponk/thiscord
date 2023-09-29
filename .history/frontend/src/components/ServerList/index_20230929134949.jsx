import React, { useEffect } from "react";
import "./ServerList.css";
import ServerItem from "./ServerItem";
import { useSelector, useDispatch } from "react-redux";
import { fetchJoinedServers } from "../../store/server";
import { ReactComponent as AddButton } from "../../assets/plus-server.svg";
import { ReactComponent as UserProfile } from "../../assets/profile-logo.svg";
import { ReactComponent as Explore } from "../../assets/explore.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ServerList = ({ setShowModal }) => {
    const history = useHistory();
    const userId = useSelector((state) => state.session.user.id);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchJoinedServers(userId));
    }, [dispatch, userId]);

    const servers = useSelector((state) => Object.values(state.servers));

    return (
        <ul className="server-list">
            <li>
                <button
                    className="server-item"
                    onClick={() => history.push("/channels/@me")}
                >
                    <UserProfile className="user-profile-icon" />
                </button>
            </li>
            <li>
                <div className="line"></div>
            </li>
            {servers.map((server) => (
                <ServerItem key={server.id} server={server} />
            ))}
            <li>
                <button
                    onClick={() => setShowModal(true)}
                    className="add-server"
                >
                    <AddButton className="add-server-icon" />
                </button>
            </li>
            <li>
                <button
                    onClick={() => history.push("/channels/explore")}
                    className="add-server"
                >
                    <Explore className="add-server-icon" />
                </button>
            </li>
        </ul>
    );
};

export default ServerList;
