const path = require('path')
const FtpDeploy = require('ftp-deploy')
const ftpDeploy = new FtpDeploy()
require('dotenv').config()

const nodeModules = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASS,
  host: process.env.FTP_HOST,
  port: 21,
  localRoot: path.join(__dirname, '../', '/node_modules'),
  remoteRoot: '/apps_nodejs/node_modules',
  include: ['*', '**/*'],
  deleteRemote: false,
  forcePasv: true,
  sftp: false
}

ftpDeploy
  .deploy(nodeModules)
  .then((res) => { console.log('Node Modules: ', res) })
  .catch((err) => console.log(err))
