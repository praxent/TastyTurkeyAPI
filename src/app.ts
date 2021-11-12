import { RegisterRoutes } from '../build/routes.js'
import express, { Response as ExResponse, Request as ExRequest } from 'express'
import swaggerUi from 'swagger-ui-express'

export const app = express()

// Use body parser to read sent json payloads
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())

app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import('../build/swagger.json')))
})

RegisterRoutes(app)
