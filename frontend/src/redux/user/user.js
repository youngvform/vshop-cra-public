import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  createUserProfileDocument,
  signInWithGoogle,
  auth,
  getCurrentUser
} from "../../firebase/firebase.utils";

const SET_CURRENT_USER = "SET_CURRENT_USER";
const GOOGLE_SIGN_IN_START = "GOOGLE_SIGN_IN_START";
const EMAIL_SIGN_IN_START = "EMAIL_SIGN_IN_START";
const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";
const CHECK_USER_SESSION = "CHECK_USER_SESSION";
const SIGN_OUT_START = "SIGN_OUT_START";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
const SIGN_OUT_FAILURE = "SIGN_OUT_FAILURE";
const SIGN_UP_START = "SIGN_UP_START";
const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user
});

export const googleSignInStart = () => ({
  type: GOOGLE_SIGN_IN_START
});

export const emailSignInStart = emailAndPassword => ({
  type: EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

export const signInSuccess = user => ({
  type: SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = errorMessage => ({
  type: SIGN_IN_FAILURE,
  payload: errorMessage
});

export const checkUserSession = () => ({
  type: CHECK_USER_SESSION
});

export const signOutStart = () => ({
  type: SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
  type: SIGN_OUT_FAILURE,
  payload: error
});

export const signUpStart = userInfo => ({
  type: SIGN_UP_START,
  payload: userInfo
});
export const signUpSuccess = user => ({
  type: SIGN_UP_SUCCESS,
  payload: user
});
export const signUpFailure = error => ({
  type: SIGN_UP_FAILURE,
  payload: error
});

// redux-saga code start.
function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (err) {
    yield put(signInFailure(err.message));
  }
}
export function* signInWithGoogleSaga() {
  try {
    const { user } = yield signInWithGoogle();
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    yield put(signInFailure(err.message));
  }
}

export function* onGoogleSignInSaga() {
  yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogleSaga);
}

export function* signInWithEmailSaga({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    yield put(signInFailure(err.message));
  }
}

export function* onEmailSignInSaga() {
  yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmailSaga);
}

export function* checkUserSessionSaga() {
  try {
    const userAuth = yield getCurrentUser();

    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (err) {
    yield put(signInFailure(err.message));
  }
}

export function* onCheckUserSessionSaga() {
  yield takeLatest(CHECK_USER_SESSION, checkUserSessionSaga);
}

export function* signOutSaga() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailure(err.message));
  }
}

export function* onSignOutStartSaga() {
  yield takeLatest(SIGN_OUT_START, signOutSaga);
}

export function* signUpSaga({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: displayName }));
  } catch (err) {
    yield put(signUpFailure(err.message));
  }
}

export function* onSignUpStartSaga() {
  yield takeLatest(SIGN_UP_START, signUpSaga);
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpSuccessSaga() {
  yield takeLatest(SIGN_UP_SUCCESS, signInAfterSignUp);
}
export function* userSagas() {
  yield all([
    call(onGoogleSignInSaga),
    call(onEmailSignInSaga),
    call(onCheckUserSessionSaga),
    call(onSignOutStartSaga),
    call(onSignUpStartSaga),
    call(onSignUpSuccessSaga)
  ]);
}

const INITIAL_STATE = {
  currentUser: null,
  errorMessage: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        errorMessage: null
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        errorMessage: null
      };
    case SIGN_IN_FAILURE:
    case SIGN_OUT_FAILURE:
    case SIGN_UP_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
