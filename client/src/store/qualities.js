import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import qualityService from '../services/quality.service'
import isOutdated from '../utils/isOutdated'

const initialState = {
  entities: null,
  isLoading: true,
  error: null,
  lastFetch: null
}

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState,
  reducers: {
    qualitiesRequested(state) {
      state.isLoading = true
    },
    qualitiesReceived(state, action) {
      state.entities = action.payload
      state.isLoading = false
      state.lastFetch = Date.now()
    },
    qualitiesRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
      toast.info(state.error)
    }
  }
})

const {qualitiesRequested, qualitiesReceived, qualitiesRequestFailed} = qualitiesSlice.actions

export const loadQualitiesList = () => async (dispatch, state) => {
  if (isOutdated(state().qualities.lastFetch)) {
    dispatch(qualitiesRequested())
    try {
      const {content} = await qualityService.get()
      dispatch(qualitiesReceived(content))
    } catch (err) {
      dispatch(qualitiesRequestFailed(err.response?.data?.error || err.message))
    }
  }
}

export const getQualities = () => state => state.qualities.entities
export const getQualitiesLoadingStatus = () => state => state.qualities.isLoading

const {reducer: qualitiesReducer} = qualitiesSlice

export default qualitiesReducer
