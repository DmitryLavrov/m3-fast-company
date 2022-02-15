import React from 'react'
import { NavLink } from 'react-router-dom'
import NavProfile from './navProfile'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/users'

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn())

  return (
    <nav className="navbar bg-info mb-4">
      <div className="d-inline-block">
        <ul className="nav">
          <li className="nav-item">
            <NavLink to="/" exact
                     className="nav-link"
                     activeStyle={{fontWeight: 'bold'}}>
              Main
            </NavLink>
          </li>

          {isLoggedIn &&
          <li className="nav-item">
            <NavLink to="/users"
                     className="nav-link"
                     activeStyle={{fontWeight: 'bold'}}>
              Users
            </NavLink>
          </li>}
        </ul>
      </div>

      <div className="d-flex">
        {isLoggedIn
          ? <NavProfile/>
          : <NavLink to="/login"
                     className="nav-link">
            Login
          </NavLink>
        }
      </div>
    </nav>
  )
}

export default NavBar
