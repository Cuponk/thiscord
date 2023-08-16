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
    const res = await fetch('/api/servers/');
    const data = await res.json();
    dispatch(addServers(data.servers));
    return res;
}

export const fetchServer = (serverId) => async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}`);
    const data = await res.json();
    dispatch(addServer(data.server));
    return res;
}

export const createServer = (server) => async (dispatch) => {
    const res = await fetch('/api/servers/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(server)
    });
    const data = await res.json();
    dispatch(addServer(data.server));
    return res;
}

export const updateServer = (server) => async (dispatch) => {
    const res = await fetch(`/api/servers/${server.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(server)
    });
    const data = await res.json();
    dispatch(addServer(data.server));
    return res;
}

export const deleteServer = (serverId) => async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}`, {
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
