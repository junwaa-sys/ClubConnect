import express from 'express'
import dashboardRoutes from './routes/dashboard'
import { join, resolve } from 'node:path'
import adminHomeRoutes from './routes/adminHome'
import * as dotenv from 'dotenv'
import checkoutRoutes from './routes/checkout'
import membershipOptionRoutes from './routes/MembershipOptions'
import adminMembershipOptionRoutes from './routes/adminMembershipOptions'
import adminManageRoutes from './routes/adminManageMember'
import stripeWebhookRoutes from './routes/webhooks'

dotenv.config()
const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/checkout', checkoutRoutes)
server.use('/api/v1/membership-options', membershipOptionRoutes)
server.use('/api/v1/admin-home', adminHomeRoutes)
server.use('/api/v1/admin-manage-member', adminManageRoutes)
server.use('/api/v1/dashboard', dashboardRoutes)
server.use('/api/v1', adminHomeRoutes)
server.use('/api/v1/admin/membership-options', adminMembershipOptionRoutes)
server.use('/api/v1/stripe', stripeWebhookRoutes)

server.get('*', (req, res) => {
  res.sendFile(resolve('server/public/index.html'))
})

export default server
