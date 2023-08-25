import csrfFetch from './csrf.js';

export const ADD_SERVER = 'ADD_SERVER';
export const REMOVE_SERVER = 'REMOVE_SERVER';
export const ADD_SERVERS = 'ADD_SERVERS';

export const addServer = (server) => ({
    type: ADD_SERVER,
    server
});

export const removeServer = (server) => ({
    type: REMOVE_SERVER,
    server
});

export const addServers = (servers) => ({
    type: ADD_SERVERS,
    servers
});

export const fetchServers = () => async (dispatch) => {
    const res = await csrfFetch('/api/servers/');
    if (res.ok) {
        const data = await res.json();
        dispatch(addServers(data.servers));
    }
}

export const fetchJoinedServers = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers?userId=${userId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(addServers(data.servers));
    }
}

export const fetchServer = (serverId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}`);
    const data = await res.json();
    // console.log(data)
    dispatch(addServer(data.server));
    return res;
}

export const createServer = (server) => async (dispatch) => {
    const res = await csrfFetch('/api/servers/', {
        method: 'POST',
        headers: {
        },
        body: server
    });
    const data = await res.json();
    dispatch(addServer(data.server));
    return res;
}

export const updateServer = (server) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${server.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: server
    });
    const data = await res.json();
    dispatch(addServer(data.server));
    return res;
}

export const deleteServer = (serverId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    dispatch(removeServer(data.server));
    return res;
}


const serverReducer = (state = {}, action) => {
    const nextState = {...state};
    switch (action.type) {
        case ADD_SERVER:
            nextState[action.server.id] = action.server;
            return nextState;
        case REMOVE_SERVER:
            delete nextState[action.server.id];
            return nextState;
        case ADD_SERVERS:
            return {...nextState, ...action.servers}
        default:
            return state;
    }
}

export default serverReducer;
