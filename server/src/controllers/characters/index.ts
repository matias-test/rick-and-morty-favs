import { Response, Request } from 'express'
import { getCharacters } from 'rickmortyapi'

export async function listCharacters(req: Request, res: Response) {
  const { page } = req.query as { page?: number }

  const response = await getCharacters({ page: page || 1 })

  res.status(response.status).json(response.data);
}

export async function fetchCharacter(id: number) {
  throw new Error('Not yet implemented')
}

export async function toggleCharacterFav() {
  throw new Error('Not yet implemented')
}
