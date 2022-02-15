import React from 'react'

import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import { Redirect, useParams } from 'react-router-dom'
import UsersLoader from '../components/ui/hoc/usersLoader'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/users'
import EditUserPage from '../components/page/editUserPage/editUserPage'

const Users = () => {
  const {userId, edit} = useParams()
  const currentUserId = useSelector(getCurrentUserId())

  return (
    <UsersLoader>
      {userId
        ? edit
          ? userId === currentUserId
            ? <EditUserPage/>
            : <Redirect to={`/users/${currentUserId}/edit`}/>
          : <UserPage userId={userId}/>
        : <UsersListPage/>
      }
    </UsersLoader>
  )
}

export default Users
