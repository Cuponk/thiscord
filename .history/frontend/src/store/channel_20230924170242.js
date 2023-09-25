import csrfFetch from "./csrf";

const ADD_CHANNEL = "ADD_CHANNEL";
const ADD_CHANNELS = "ADD_CHANNELS";
const REMOVE_CHANNEL = "REMOVE_CHANNEL";
const RESET_CHANNELS = "RESET_CHANNELS";

const addChannels = (channels) => ({
    type: ADD_CHANNELS,
    channels,
});

const addChannel = (channel) => ({
    type: ADD_CHANNEL,
    channel,
});

const removeChannel = (channel) => ({
    type: REMOVE_CHANNEL,
    channel,
});

export const resetChannels = () => ({
    type: RESET_CHANNELS,
});

export const fetchChannels = (serverId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}/channels`);
    const data = await res.json();
    dispatch(addChannels(data.channels));
};

export const fetchChannel = (serverId, channelId) => async (dispatch) => {
    const res = await csrfFetch(
        `/api/servers/${serverId}/channels/${channelId}`
    );
    const data = await res.json();
    dispatch(addChannel(data.channel));
    return res;
};

export const createChannel = (channel, serverId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}/channels/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(channel),
    });
    if (!res.ok) {
        throw res;
    }
    const channel = await res.json();
    dispatch(addChannel(channel));
    return channel;
} catch (err) {
    console.error(err);
    const error = await err.json();
    return error;
}
};

export const updateChannel =
    (serverId, payload, channelId) => async (dispatch) => {
        const res = await csrfFetch(
            `/api/servers/${serverId}/channels/${channelId}`,
            {
                method: "PATCH",
                body: JSON.stringify(payload),
            }
        );
        if (res.ok) {
            return await res.json();
        } else {
            throw res;
        }
    };

export const deleteChannel = (serverId, channelId) => async (dispatch) => {
    const res = await csrfFetch(
        `/api/servers/${serverId}/channels/${channelId}`,
        {
            method: "DELETE",
        }
    );
    const data = await res.json();
    dispatch(removeChannel(data.channel));
    return res;
};

const channelReducer = (state = {}, action) => {
    const nextState = { ...state };
    switch (action.type) {
        case ADD_CHANNEL:
            if (action.channel) {
                nextState[action.channel.id] = action.channel;
            }
            return nextState;
        case ADD_CHANNELS:
            return { ...nextState, ...action.channels };
        case REMOVE_CHANNEL:
            delete nextState[action.channel.id];
            return nextState;
        case RESET_CHANNELS:
            return {};
        default:
            return state;
    }
};

export default channelReducer;
