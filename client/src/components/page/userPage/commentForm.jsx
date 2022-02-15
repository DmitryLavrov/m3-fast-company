import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import TextField from '../../common/form/textField'
import { validator } from '../../../utils/validator'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../../store/comments'
import { getCurrentUserId } from '../../../store/users'

const validatorConfig = {
  content: {
    isRequired: {message: 'Сообщение не может быть пустым'}
  }
}

const CommentForm = ({userId: pageId}) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({content: ''})
  const [errors, setErrors] = useState({})
  const userId = useSelector(getCurrentUserId())

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (field) => {
    setData(prev => ({
      ...prev,
      [field.name]: field.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const isValid = validate()
    if (!isValid) return

    dispatch(createComment({...data, pageId, userId}))
  }

  const isValid = (Object.keys(errors).length === 0)

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h2>New comment</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <TextField name="content"
                       label="Сообщение"
                       value={data.content}
                       onChange={handleChange}
                       error={errors.content}/>
          </div>

          <div className="text-end">
            <button className="btn btn-primary"
                    type="submit"
                    disabled={!isValid}>
              Отправить
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

CommentForm.propTypes = {
  userId: PropTypes.string,
  renderComments: PropTypes.func
}

export default CommentForm
