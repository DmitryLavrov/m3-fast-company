import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getQualities, getQualitiesLoadingStatus, loadQualitiesList } from '../../../store/qualities'

const Qualities = ({qualities: qualitiesId}) => {
  const dispatch = useDispatch()
  const qualities = useSelector(getQualities())
  const isLoading = useSelector(getQualitiesLoadingStatus())

  useEffect(() => {
    dispatch(loadQualitiesList())
  })

  if (isLoading) {
    return 'Loading...'
  }

  const userQualities = qualities ? qualitiesId.map(id => (qualities.find(q => (q._id === id)))) : []

  return (
    <>
      {userQualities.map((q) => (
        <Quality key={q._id}
                 name={q.name}
                 color={q.color}/>
      ))}
    </>
  )
}

Qualities.propTypes = {
  qualities: PropTypes.array.isRequired
}

export default Qualities

const Quality = ({name, color}) => {
  return <span className={`badge bg-${color} m-1`}>{name}</span>
}

Quality.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}
