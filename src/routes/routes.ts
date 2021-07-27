import { Router, Request, Response } from 'express'

import { monitoramento } from '../controllers/twitterstreamController'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'WIP' })
})

router.get('/monitoramento', monitoramento)

router.get('*', function (req, res) {
  res.json({ status: 404 })
})

export default router
