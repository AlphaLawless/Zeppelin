import express, { Request, Response } from 'express'
import moment from 'moment-timezone'
import { GuildArchives } from '../data/GuildArchives.js'
import { notFound } from './presentation/helpers/http-responses.js'

export function initArchives(router: express.Router) {
  const archives = new GuildArchives(null)

  // Legacy redirect
  router.get('/spam-logs/:id', (req: Request, res: Response) => {
    res.redirect('/archives/' + req.params.id)
  })

  router.get('/archives/:id', async (req: Request, res: Response) => {
    const archive = await archives.find(req.params.id)
    if (!archive) return notFound(res)

    let body = archive.body

    // Add some metadata at the end of the log file (but only if it doesn't already have it directly in the body)
    // TODO: Use server timezone / date formats
    if (archive.body.indexOf('Log file generated on') === -1) {
      const createdAt = moment.utc(archive.created_at).format('YYYY-MM-DD [at] HH:mm:ss [(+00:00)]')
      body += `\n\nLog file generated on ${createdAt}`

      if (archive.expires_at !== null) {
        const expiresAt = moment.utc(archive.expires_at).format('YYYY-MM-DD [at] HH:mm:ss [(+00:00)]')
        body += `\nExpires at ${expiresAt}`
      }
    }

    res.setHeader('Content-Type', 'text/plain; charset=UTF-8')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.end(body)
  })
}
