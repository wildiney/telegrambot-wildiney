import { Router } from 'express'
import { monitoramento } from '../controllers/twitterstreamController'

const router = Router()

router.get('/monitoramento', monitoramento)

export default router
