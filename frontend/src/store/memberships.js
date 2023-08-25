import csrfFetch from "./csrf";

export const ADD_MEMBERSHIP = "ADD_MEMBERSHIP";
export const ADD_MEMBERSHIPS = "ADD_MEMBERSHIPS";

export const addMembership = (membership) => ({
    type: ADD_MEMBERSHIP,
    membership
});

export const addMemberships = (memberships) => ({
    type: ADD_MEMBERSHIPS,
    memberships
});

export const fetchMemberships = () => async (dispatch) => {
    const res = await csrfFetch('/api/membership/');
    if (res.ok) {
        const data = await res.json();
        dispatch(addMemberships(data.memberships));
    }
}

export const createMembership = (membership) => async (dispatch) => {
    const res = await csrfFetch('/api/membership/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(membership)
    });
    const data = await res.json();
    dispatch(addMembership(data.membership));
    return res;
}

const membershipsReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_MEMBERSHIP:
            return {
                ...state,
                [action.membership.id]: action.membership
            }
        case ADD_MEMBERSHIPS:
            return {
                ...state,
                ...action.memberships
            }
        default:
            return state;
    }
}

export default membershipsReducer;