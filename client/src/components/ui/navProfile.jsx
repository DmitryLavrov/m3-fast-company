import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentUserData } from '../../store/users'

const NavProfile = () => {
  const [isOpen, setOpen] = useState(false)
  const currentUser = useSelector(getCurrentUserData())

  const toggleMenu = () => setOpen((prev) => !prev)

  if (!currentUser) {
    return (
      <Link to="/logout"
            className="nav-link">
        Log out
      </Link>
    )
  }

  return (
    <div className="dropdown"
         onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">
          {currentUser.name}
        </div>
        <img src={currentUser.image}
             className="img-responsive rounded-circle"
             alt="User photo"
             height="40"/>
      </div>

      <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')} style={{right: 0}}>
        <Link to={`/users/${currentUser._id}`}
              className="dropdown-item">
          Profile
        </Link>
        <Link to="/logout"
              className="dropdown-item">
          Log out
        </Link>
      </div>
    </div>
  )
}

export default NavProfile
