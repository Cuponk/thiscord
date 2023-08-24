import csrfFetch from "./csrf";

const ADD_USER = 'ADD_USER';
const ADD_USERS = 'ADD_USERS';

export const addUsers = (users) => ({
    type: ADD_USERS,
    users
})

export const addUser = (user) => ({
    type: ADD_USER,
    user
})

export const fetchUsers = () => async dispatch => {
    const res = await csrfFetch(`/api/users`);
    const data = await res.json()
    dispatch(addUsers(data.users))
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
        case ADD_USERS:
            return { ...state, ...action.users };
        case ADD_USER:
            if (action.users) {
                nextState[action.user.id] = action.user;
            }
            return nextState;
        default:
            return state;
    }
}

export default userReducer;