import csrfFetch from "./csrf";

const ADD_MESSAGE = 'ADD_MESSAGE';
const ADD_MESSAGES = 'ADD_MESSAGES';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
const RESET_MESSAGES = 'RESET_MESSAGES'

export const addMessages = (messages) => ({
    type: ADD_MESSAGES,
    messages
})

export const removeMessage = (message) => ({
    type: REMOVE_MESSAGE,
    message
})

export const resetMessages = () => ({
    type: RESET_MESSAGES
})

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    message
})

export const fetchMessages = (serverId, channelId) => async dispatch => {
    const res = await csrfFetch(`/api/servers/${serverId}/channels/${channelId}/messages`);
    const data = await res.json()
    dispatch(addMessages(data.messages))
}

export const fetchMessage = (serverId, channelId, messageId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}/channels/${channelId}/messages/${messageId}`);
    const data = await res.json();
    dispatch(addMessage(data.message));
    return res;
}

export const createMessage = (message, serverId, channelId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}/channels/${channelId}/messages/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    });
    const data = await res.json();
    dispatch(addMessage(data.message));
    return res;
}

export const updateMessage = (message) => async (dispatch) => {
    const res = await csrfFetch('/api/message/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    });
    const data = await res.json();
    dispatch(addMessage(data.message));
    return res;
}

export const deleteMessage = (messageId) => async (dispatch) => {
    const res = await csrfFetch(`/api/message/${messageId}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    dispatch(removeMessage(data.message));
    return res;
}



const messagesReducer = (state = {}, action) => {
    const nextState = {...state};
    switch (action.type) {
        case ADD_MESSAGE:
            if (action.message) {
                nextState[action.message.id] = action.message;
            }
            return nextState;
        case ADD_MESSAGES:
            return {...nextState, ...action.messages};
        case REMOVE_MESSAGE:
            delete nextState[action.message.id]
            return nextState;
        case RESET_MESSAGES:
            return {};
        default:
            return state;
    }
}

export default messagesReducer;
