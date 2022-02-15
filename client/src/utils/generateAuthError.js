
function generateAuthError(message) {
  switch (message) {
    case 'INVALID_PASSWORD':
      return 'Неверный пароль'
    case 'EMAIL_NOT_FOUND':
      return 'Пользователь с таким EMAIL не найден'
    case 'EMAIL_EXISTS':
      return 'Пользователь с таким EMAIL уже существует'
    default :
      return 'Пароль введен много раз. Попробуйте позже'
  }
}

export default generateAuthError
