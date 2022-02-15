const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')


const initDatabase = require('./start/initDatabase')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/api', routes)

// if (process.env.NODE_ENV === 'production') {
//   console.log('Production:')
// } else if (process.env.NODE_ENV === 'development') {
//   console.log('Development:')
// }

const port = config.get('port') ?? 8080
const host = config.get('host') ?? 'localhost'
const mongoUri = config.get('mongoUri')
                       .replace('<user>', config.get('mongoUser'))
                       .replace('<password>', config.get('mongoPassword'))

async function start() {
  try {
    mongoose.connection.once('open', () => initDatabase())
    await mongoose.connect(mongoUri)
    app.listen(port, host, () => {
      console.log(chalk.cyan(`Server started on: http://${host}:${port}`))
    })
  } catch (err) {
    console.log(chalk.red(err.message))
    process.exit(1)
  }
}

start()
