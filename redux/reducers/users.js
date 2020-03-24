import { actionTypes } from './../actions'

export const acntState = {
  status: 0,
  data: {},
};

const userReducer = (state = acntState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_ACNT:
      return {
        ...state,
        status: action.status,
        data: action.data,
      }
    default:
      return state;
  }
}

export default userReducer;