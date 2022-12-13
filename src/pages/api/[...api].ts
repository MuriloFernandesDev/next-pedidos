import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import superagent from 'superagent'
const { parseCookies } = require('nookies')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parsedCookies = parseCookies({ req })
  const { body, method } = req
  const { api }: any = req.query
  const UrlRequest = api.join('/')

  if (method === 'POST') {
    try {
      const URL = `${process.env.API_URL}/match/${UrlRequest}`
      const response = await superagent
        .post(URL)
        .send(body) // sends a JSON post body
        // .set('X-API-Key', 'foobar') para adicionar key api
        .set('Content-Type', 'Application/json')

      res.status(response.status).json(JSON.parse(response.text))
    } catch (err: any) {
      res.status(err.status).json(JSON.parse(err.response.text))
      // return err
    }
  } else if (method === 'GET') {
    try {
      const URL = `${process.env.API_URL}/match/${UrlRequest}`
      const response = await superagent
        .get(URL)
        // .set('X-API-Key', 'foobar') para adicionar key api
        .set('Content-Type', 'Application/json')
        .set('Authorization', `Bearer ${parsedCookies}`)
      res.status(response.status).json(JSON.parse(response.text))
    } catch (err: any) {
      res.status(err.status).json(JSON.parse(err.response.text))
      // return err
    }
  }
}
