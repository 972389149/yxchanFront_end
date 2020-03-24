/**
 * Created by yuxichan on 2020.2.18.
 */
import { fork } from 'redux-saga/effects'
import { checkLogin, loginOut, login, register, reSetInfo } from './sagas/users'

export default function* rootSaga() {
  yield fork(checkLogin);
  yield fork(loginOut);
  yield fork(login);
  yield fork(register);
  yield fork(reSetInfo);
}