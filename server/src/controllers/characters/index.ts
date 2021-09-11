import { Response, Request } from 'express'
import { getCharacter, getCharacters } from 'rickmortyapi'

export async function listCharacters(req: Request, res: Response) {
  const { page } = req.query as { page?: number }

  const response = await getCharacters({ page: page || 1 })

  if (response.data.info) {
    if (response.data.info.next) {
      const url = new URL(response.data.info.next);
      response.data.info.next = url.searchParams.get('page');
    }
    if (response.data.info.prev) {
      const url = new URL(response.data.info.prev);
      response.data.info.prev = url.searchParams.get('page');
    }
  }

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
