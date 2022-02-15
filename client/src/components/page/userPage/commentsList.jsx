import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import Comment from './comment'
import { deleteComment, getComments, getCommentsLoadingStatus, loadCommentsList } from '../../../store/comments'
import { useParams } from 'react-router-dom'
import { orderBy } from 'lodash'

const CommentsList = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getCommentsLoadingStatus())
  const comments = useSelector(getComments())

  const {userId} = useParams()

  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [userId])

  const handleDelete = (id) => {
    dispatch(deleteComment(id))
  }

  const sortedComments = orderBy(comments, ['createdAt'], ['desc'])

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Comments</h2>
        <hr/>

        {isLoading
          ? <p>Loading...</p>
          : sortedComments.map(comment => (
            <Comment key={comment._id} comment={comment} onDelete={handleDelete}/>
          ))
        }

      </div>
    </div>
  )
}

CommentsList.propTypes = {
  comments: PropTypes.array,
  onDelete: PropTypes.func
}

export default CommentsList
