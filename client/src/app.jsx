import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import ProtectedRoute from './components/common/protectedRoute'
import Logout from './layouts/logout'
import EditUserPage from './components/page/editUserPage/editUserPage'
import AppLoader from './components/ui/hoc/appLoader'

const App = () => {
  return (
    <AppLoader>
      <NavBar/>
      <Switch>
        <Route path="/login/:type?"><Login/></Route>
        <Route path="/logout"><Logout/></Route>
        <Route path="/users/:userId?/edit"><EditUserPage/></Route>
        <ProtectedRoute path="/users/:userId?"><Users/></ProtectedRoute>
        <Route path="/" exact><Main/></Route>
        <Redirect to="/"/>
      </Switch>
      <ToastContainer/>
    </AppLoader>
  )
}

export default App
