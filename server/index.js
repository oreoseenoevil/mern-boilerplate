require('dotenv').config()
const express = require('express')
const chalk = require('chalk')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const compression = require('compression')

const keys = require('./config/keys')
const connectDB = require('./config/db')

const { port } = keys
connectDB()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
  useTempFiles: true
}))
app.use(compression())

app.listen(port, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Listening on port ${port}.`
    )}`
  )
})
