import { createAction, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
// import { nanoid } from 'nanoid'

import commentService from '../services/comment.service'

const initialState = {
  entities: null,
  isLoading: true,
  error: null
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsRequested(state) {
      state.isLoading = true
    },
    commentsReceived(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
      toast.info(state.error)
    },
    commentCreated(state, action) {
      state.entities.push(action.payload)
    },
    commentCreateFailed(state, action) {
      state.error = action.payload
      toast.info(state.error)
    },
    commentDeleted(state, action) {
      if (!action.payload.content) {
        state.entities = state.entities.filter(c => (c._id !== action.payload.id))
      }
    },
    commentDeleteFailed(state, action) {
      state.error = action.payload
      toast.info(state.error)
    }
  }
})

const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreated,
  commentCreateFailed,
  commentDeleted,
  commentDeleteFailed
} = commentsSlice.actions

const commentCreateRequested = createAction('comments/commentCreateRequested')
const commentDeleteRequested = createAction('comments/commentDeleteRequested')

// FOR CommentsList.jsx
export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const {content} = await commentService.getComments(userId)
    dispatch(commentsReceived(content))
  } catch (err) {
    dispatch(commentsRequestFailed(err.response?.data?.error || err.message))
  }
}

// COMMENTS ACTIONS
export const createComment = (payload) => async (dispatch) => {
  dispatch(commentCreateRequested())
  try {
    const {content} = await commentService.createComment(payload)
    dispatch(commentCreated(content))
  } catch (err) {
    dispatch(commentCreateFailed(err.response?.data?.error || err.message))
  }
}

export const deleteComment = (id) => async (dispatch) => {
  dispatch(commentDeleteRequested())
  try {
    const {content} = await commentService.deleteComment(id)
    dispatch(commentDeleted({id, content}))
  } catch (err) {
    dispatch(commentDeleteFailed(err.response?.data?.error || err.message))
  }
}

// SELECTORS
export const getComments = () => state => state.comments.entities

export const getCommentsLoadingStatus = () => state => state.comments.isLoading

const {reducer: commentsReducer} = commentsSlice
export default commentsReducer
