import { call, put, select, takeLatest } from 'redux-saga/effects';
import { articleFormActions } from '.';
import { request, ResponseError } from 'utils/request';
import { selectName, selectPath, selectUuid } from './selectors';

export function* createArticle() {
  const uuid = yield select(selectUuid);
  const name = yield select(selectName);
  const path = yield select(selectPath);

  const requestURL = process.env.REACT_APP_API_URL + '/' + path;
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uuid,
      name,
    }),
  };

  try {
    yield call(request, requestURL, options);
    yield put(articleFormActions.articleCreated());
  } catch (error) {
    let httpStatus: number = 0;
    if (error instanceof ResponseError) {
      httpStatus = error.response.status;
    }
    yield put(articleFormActions.onErrorResponse(httpStatus));
  } finally {
    yield put(articleFormActions.articleCreated());
  }
}

export function* articleFormSaga() {
  yield takeLatest(articleFormActions.createArticle.type, createArticle);
}
