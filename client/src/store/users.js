import { createSlice, createAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import history from '../utils/history'
import generateAuthError from '../utils/generateAuthError'

const initialState = localStorageService.getAccessToken()
  ? {
    entities: null,
    isLoading: true,
    error: null,
    auth: {userId: localStorageService.getUserId()},
    isLoggedIn: true,
    dataLoaded: false
  }
  : {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false
  }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested(state) {
      state.isLoading = true
    },
    usersReceived(state, action) {
      state.entities = action.payload
      state.isLoading = false
      state.dataLoaded = true
    },
    usersRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
      toast.info(state.error)
    },
    authRequestSuccess(state, action) {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequested(state) {
      state.error = null
    },
    authRequestFailed(state, action) {
      state.error = action.payload
      toast.info(state.error)
    },
    userCreated(state, action) {
      state.entities.push(action.payload)
    },
    userCreateFailed(state, action) {
      state.error = action.payload
      toast.info(state.error)
    },
    userUpdated(state, action) {
      const idx = state.entities.findIndex(i => i._id === localStorageService.getUserId())
      state.entities[idx] = {...state.entities[idx], ...action.payload}
    },
    userUpdateFailed(state, action) {
      state.error = action.payload
      toast.info(state.error)
    },
    userLoggedOut(state) {
      state.entities = null
      state.auth = null
      state.isLoggedIn = false
      state.dataLoaded = false
    }
  }
})

const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequested,
  authRequestSuccess,
  authRequestFailed,
  // userCreated,
  // userCreateFailed,
  userUpdated,
  userUpdateFailed,
  userLoggedOut
} = usersSlice.actions

// for APP.JS and USERS.JSX or APPLOADER.JSX and USERSLOADER.JSX
export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const {content} = await userService.get()
    dispatch(usersReceived(content))
  } catch (err) {
    dispatch(usersRequestFailed(err.response?.data?.error || err.message))
  }
}

// AUTH
// const userCreateRequested = createAction('users/userCreateRequested')
const userUpdateRequested = createAction('users/userUpdateRequested')

export const signUp = (payload) => async dispatch => {
  dispatch(authRequested())
  try {
    const data = await authService.register(payload)
    localStorageService.setToken(data)
    dispatch(authRequestSuccess({
      userId: data.userId
    }))
    history.push('/users')
  } catch (err) {
    dispatch(authRequestFailed(err.response?.data?.error || err.message))
  }
}

export const login = ({payload, redirect}) => async dispatch => {
  const {email, password} = payload
  dispatch(authRequested())
  try {
    const data = await authService.login({email, password})
    localStorageService.setToken(data)
    dispatch(authRequestSuccess({
      userId: data.userId
    }))
    history.push(redirect)
  } catch (err) {
    const {code, message} = err.response.data.error
    if (code === 400) {
      const errorMessage = generateAuthError(message)
    dispatch(authRequestFailed(errorMessage))
    } else {
      dispatch(authRequestFailed(err.response?.data?.error || err.message))
    }
  }
}

export const logout = () => async dispatch => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
  history.push('/')
}

export const updateUserData = (payload) => async dispatch => {
  dispatch(authRequested())
  try {
    dispatch(updateUser(localStorageService.getUserId(), payload))
  } catch (err) {
    dispatch(authRequestFailed(err.response?.data?.error || err.message))
  }
}

function updateUser(id, payload) {
  return async dispatch => {
    dispatch(userUpdateRequested())
    try {
      const {content} = await userService.update(id, payload)
      dispatch(userUpdated(content))
      history.push(`/users/${id}`)
    } catch (err) {
      dispatch(userUpdateFailed(err.response?.data?.error || err.message))
    }
  }
}

// SELECTORS
export const getUsersList = () => state => state.users.entities

export const getUserById = (id) => state => {
  if (state.users.entities) {
    return state.users.entities.find(u => u._id === id)
  }
  return {}
}

export const getIsLoggedIn = () => state => state.users.isLoggedIn

export const getDataStatus = () => state => state.users.dataLoaded

export const getCurrentUserId = () => state => state.users.auth.userId

export const getCurrentUserData = () => state => state.users.entities
  ? state.users.entities.find(u => u._id === state.users.auth.userId)
  : null

export const getUsersLoadingStatus = () => state => state.users.isLoading

export const getAuthError = () => state => state.users.error

const {reducer: usersReducer} = usersSlice
export default usersReducer
