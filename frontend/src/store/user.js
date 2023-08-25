import csrfFetch from "./csrf";

const ADD_USER = 'ADD_USER';
const ADD_USERS = 'ADD_USERS';
export const ADD_MEMBERS = 'ADD_MEMBERS'
export const RESET_MEMBERS = 'RESET_MEMBERS'

export const addUsers = (users) => ({
    type: ADD_USERS,
    users
})

export const addUser = (user) => ({
    type: ADD_USER,
    user
})

export const addMembers = (members) => ({
    type: ADD_MEMBERS,
    members
})

export const resetMembers = () => ({
    type: RESET_MEMBERS
})


export const fetchMembers = (serverId) => async dispatch => {
    const res = await csrfFetch(`/api/servers/${serverId}`);
    const data = await res.json();
    dispatch(addMembers(data.members));
    return res;
}

export const fetchUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`);
    const data = await res.json();
    dispatch(addUser(data.user));
    return res;
}



const userReducer = (state = {}, action) => {
    const nextState = {...state};
    switch (action.type) {
        case ADD_MEMBERS:
            return { ...action.members };
        case ADD_USER:
            if (action.users) {
                nextState[action.user.id] = action.user;
            }
            return nextState;
        case RESET_MEMBERS:
            return {};
        default:
            return state;
    }
}

export default userReducer;