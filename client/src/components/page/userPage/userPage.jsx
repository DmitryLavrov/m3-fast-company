import React from 'react'
import PropTypes from 'prop-types'

import UserCard from './userCard'
import CommentsList from './commentsList'
import CommentForm from './commentForm'
import { useSelector } from 'react-redux'
import { getUserById } from '../../../store/users'

const UserPage = ({userId}) => {
  const user = useSelector(getUserById(userId))

  if (!user) return <h3>Loading....</h3>

  return (
    <div className="container">
      <div className="row gutters-sm">
        <UserCard user={user}/>

        <div className="col-md-8">
          <CommentForm userId={userId}/>

          <CommentsList/>
        </div>
      </div>
    </div>
  )
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
