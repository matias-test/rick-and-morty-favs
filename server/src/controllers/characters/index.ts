import { Response, Request } from 'express'
import { getCharacter, getCharacters } from 'rickmortyapi'

export async function listCharacters(req: Request, res: Response) {
  const { page } = req.query as { page?: number }

  const response = await getCharacters({ page: page || 1 })

  res.status(response.status).json(response.data);
}

export async function fetchCharacter(req: Request, res: Response) {
  const { id } = req.params as { id: string };

  const response = await getCharacter(parseInt(id, 10))

  res.status(response.status).json(response.data);
}

export async function toggleCharacterFav() {
  throw new Error('Not yet implemented')
}
