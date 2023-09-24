import "../Channel.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchChannel } from "../../../store/channel";
import { useParams } from "react-router-dom";
import {
    fetchMessages,
    createMessage,
    resetMessages,
    addMessage,
} from "../../../store/message";
import MessageListItem from "./MessageListItem";
import consumer from "../../../consumer.js";

const ServerHome = () => {
    const dispatch = useDispatch();
    const { serverId, channelId } = useParams();
    const currentUserId = useSelector((state) => state.session.user.id);
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            message: {
                body: message,
                authorId: currentUserId,
                channelId: channelId,
            },
        };
        dispatch(createMessage(payload, serverId, channelId));
        setMessage("");
    };

    // useEffect(() => {
    //     dispatch(fetchChannel(serverId, channelId)).catch((err) =>
    //         console.log(err)
    //     );
    // }, [dispatch, serverId, channelId]);

    const channel = useSelector((state) => state.channels[channelId]);

    useEffect(() => {
        dispatch(resetMessages());
        dispatch(fetchMessages(serverId, channelId));
    }, [dispatch, channelId]);

    useEffect(() => {
        const subscription = consumer.subscriptions.create(
            {
                channel: "ChannelsChannel",
                id: channelId,
            },
            {
                received: (data) => {
                    console.log(data);
                    dispatch(addMessage(data));
                },
            }
        );
        return () => subscription?.unsubscribe();
    }, [dispatch, channelId]);

    const server = useSelector((state) => state.servers[serverId]);
    const messages = useSelector((state) => Object.values(state.messages));

    if (!server) {
        return null;
    }
    return (
        <>
            <div className="message-list">
                {messages.map((message) => (
                    <MessageListItem key={message.id} message={message} />
                ))}
            </div>
            <div className="chat-bar">
                <form onSubmit={handleSubmit}>
                    <input
                        className="chat-bar-input"
                        type="text"
                        placeholder={
                            channel
                                ? `Message #${channel.name}`
                                : "Select a channel to chat"
                        }
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></input>
                </form>
            </div>
        </>
    );
};

export default ServerHome;
