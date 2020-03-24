export const actionTypes = {
  CHECK: 'CHECK',
  LOGIN_OUT: 'LOGIN_OUT',
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  UPDATE_ACNT: 'UPDATE_ACNT',
  RESET: 'RESET',
};
export const check = params => {
  return {
    type: actionTypes.CHECK,
    payload: params,
  }
}
export const loginout = () => {
  return {
    type: actionTypes.LOGIN_OUT,
  }
}
export const login = params => {
  return {
    type: actionTypes.LOGIN,
    params: params,
  }
}
export const register = params => {
  return {
    type: actionTypes.REGISTER,
    params: params,
  }
}
export const reset = params => {
  return {
    type: actionTypes.RESET,
    payload: params,
  }
}
