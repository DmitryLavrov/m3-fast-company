import professions from '../mockData/professions.json'
import qualities from '../mockData/qualities.json'
import users from '../mockData/users.json'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import httpService from '../services/http.service'

const useMockData = () => {
  const statusConsts = {
    idle: 'Not started',
    pending: 'In process',
    success: 'Ready',
    error: 'Error occurred'
  }

  const [error, setError] = useState(null)
  const [status, setStatus] = useState(statusConsts.idle)
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (error) {
      toast.info(error)
    }
  }, [error])

  const summaryCount = professions.length + qualities.length + users.length

  const incrementCount = () => {
    setCount((prev) => {
      return prev + 1
    })
  }

  const updateProgress = () => {
    if (count !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending)
    }

    const newProgress = Math.floor((count / summaryCount) * 100)
    if (progress < newProgress) {
      setProgress(() => newProgress)
    }

    if (newProgress === 100) {
      setStatus(statusConsts.success)
    }
  }

  useEffect(() => {
    updateProgress()
  }, [count])

  async function initialize() {
    try {
      for (const p of professions) {
        await httpService.put('profession/' + p._id, p)
        incrementCount()
      }

      for (const q of qualities) {
        await httpService.put('quality/' + q._id, q)
        incrementCount()
      }

      for (const u of users) {
        await httpService.put('user/' + u._id, u)
        // await userService.create(u)
        incrementCount()
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message)
      setStatus(statusConsts.error)
    }
  }

  return {error, initialize, progress, status}
}

export default useMockData
