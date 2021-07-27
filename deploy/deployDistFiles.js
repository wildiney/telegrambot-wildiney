const path = require('path')
const FtpDeploy = require('ftp-deploy')
const ftpDeploy = new FtpDeploy()
require('dotenv').config()

const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASS,
  host: process.env.FTP_HOST,
  port: 21,
  localRoot: path.join(__dirname, '../', '/dist'),
  remoteRoot: '/apps_nodejs/',
  include: ['*', '**/*'],
  exclude: ['dist/**/*.map', 'node_modules/**', 'node_modules/**/.*', '.git/**'],
  deleteRemote: false,
  forcePasv: true,
  sftp: false
}

ftpDeploy
  .deploy(config)
  .then((res) => { console.log('finished: ', res) })
  .catch((err) => console.log(err))
