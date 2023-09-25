import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchServers } from "../../../store/server";
import Profile from "../../../assets/default.webp";
import { createMembership } from "../../../store/memberships";

const ExploreHome = () => {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state) =>
        state.session.user ? state.session.user.id : null
    );

    useEffect(() => {
        dispatch(fetchServers());
    }, [dispatch]);

    const handleClick = (id, e) => {
        e.preventDefault();
        const payload = {
            membershipable_id: id,
            membershipable_type: "Server",
            user_id: currentUserId,
        };
        dispatch(createMembership(payload));
        console.log(payload);
    };

    const servers = useSelector((state) => Object.values(state.servers));

    return (
        <div className="explore-home">
            {servers.map((server) => (
                <div className="explore-server" key={server.id}>
                    <img src={Profile} className="explore-server-icon" />
                    <div className="explore-server-name">{server.name}</div>
                    <button
                        onClick={(e) => handleClick(server.id, e)}
                        className="explore-server-button"
                    >
                        Join
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ExploreHome;
