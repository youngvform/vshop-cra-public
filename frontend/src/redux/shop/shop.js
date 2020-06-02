import { takeLatest, call, put, all } from "redux-saga/effects";

import {
  firestore,
  convertCollectionsSnapshopToMap
} from "../../firebase/firebase.utils";

const UPDATE_COLLECTIONS = "UPDATE_COLLECTIONS";
const FETCH_COLLECTIONS_START = "FETCH_COLLECTIONS_START";
const FETCH_COLLECTIONS_SUCCESS = "FETCH_COLLECTIONS_SUCCESS";
const FETCH_COLLECTIONS_FAILURE = "FETCH_COLLECTIONS_FAILURE";

export const updateCollections = collections => ({
  type: UPDATE_COLLECTIONS,
  payload: collections
});

export const fetchCollectionsStart = () => ({
  type: FETCH_COLLECTIONS_START
});

export const fetchCollectionsAsync = () => {
  return dispatch => {
    dispatch(fetchCollectionsStart());

    const collectionRef = firestore.collection("collections");

    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshopToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(err => dispatch(fetchCollectionsFailure(err)));
  };
};

export const fetchCollectionsSuccess = collections => ({
  type: FETCH_COLLECTIONS_SUCCESS,
  payload: collections
});

export const fetchCollectionsFailure = errorMessage => ({
  type: FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});
// redux-saga code start
export function* fetchCollectionsAsyncSaga() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshopToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (err) {
    yield put(fetchCollectionsFailure(err.message));
  }
}

export function* onFetchCollectionsStartSaga() {
  yield takeLatest(FETCH_COLLECTIONS_START, fetchCollectionsAsyncSaga);
}

export function* shopSagas() {
  yield all([call(onFetchCollectionsStartSaga)]);
}

const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: undefined
};

function shopReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload
      };
    case FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload
      };
    default:
      return state;
  }
}

export default shopReducer;
