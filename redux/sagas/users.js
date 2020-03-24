import { put, take, select } from 'redux-saga/effects'
import { actionTypes } from '../actions'

// 检查自动登录
export function * checkLogin() {
  while(true) {
    const info = yield take(actionTypes.CHECK);
    const status = yield select(state => state.userReducer.status);
    if (status === 1) continue;
    yield put({
      type: actionTypes.UPDATE_ACNT,
      status: info.payload.status,
      data: info.payload.data,
    })
  }
}

// 登出
export function * loginOut() {
  while(true) {
    yield take(actionTypes.LOGIN_OUT);
    const status = yield select(state => state.userReducer.status);
    if (status === 0) continue;
    yield put({
      type: actionTypes.UPDATE_ACNT,
      status: 0,
      data: {},
    })
  }
}

// 登入
export function * login() {
  while(true) {
    const login = yield take(actionTypes.LOGIN);
    const status = yield select(state => state.userReducer.status);
    if (status === 1) continue;
    yield put({
      type: actionTypes.UPDATE_ACNT,
      status: 1,
      data: login.params,
    })
  }
}

// 注册
export function * register() {
  while(true) {
    const reg = yield take(actionTypes.REGISTER);
    yield put({
      type: actionTypes.UPDATE_ACNT,
      status: 1,
      data: reg.params,
    })
  }
}

// 更改登录信息
export function * reSetInfo() {
  while(true) {
    const params = yield take(actionTypes.RESET);
    const info = yield select(state => state.userReducer);
    if(info.status === 0) continue;
    yield put({
      type: actionTypes.UPDATE_ACNT,
      status: 1,
      data: {
        ...info.data,
        ...params.payload,
      },
    })
  }
}