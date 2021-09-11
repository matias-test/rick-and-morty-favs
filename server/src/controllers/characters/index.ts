import { Response, Request } from 'express'
import jwt from 'jsonwebtoken';
import { getCharacter, getCharacters } from 'rickmortyapi'
import FavoriteCharacters from '../../models/FavoriteCharacters';
import User from '../../models/User';

export async function listCharacters(req: Request, res: Response) {
  // TODO: CODIGO REPETIDO
  const secret = process.env.SECRET;
  if (!secret) {
    return res.status(500).json({});
  }

  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized');
  }

  console.log('antes', req.headers.authorization);
  const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
  console.log('token', token);
  let userId: string = '';
  try {
    const result = jwt.verify(token, secret);
    console.log('result', result);
    userId = result.sub as string;
  } catch {
    return res.status(401).send('Unauthorized');
  }

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

  const charactersIds = (response.data.results || []).map(({ id }) => id);

  const favoriteCharacterIds = (await FavoriteCharacters
    .find({ userId, characterId: { $in: charactersIds } }, { characterId: 1, _id: 0 }))
    .map(({ characterId }) => characterId);
  console.log(favoriteCharacterIds);


  res.status(response.status)
    .json({
      ...response.data,
      results: (response.data.results || []).map((character) => ({
        ...character,
        isFav: favoriteCharacterIds.includes(character.id),
      }))
    });
}

export async function fetchCharacter(req: Request, res: Response) {
  const characterId = parseInt((req.params as { id: string }).id, 10);

  // TODO: CODIGO REPETIDO
  const secret = process.env.SECRET;
  if (!secret) {
    return res.status(500).json({});
  }

  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized');
  }

  console.log('antes', req.headers.authorization);
  const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
  console.log('token', token);
  let userId: string = '';
  try {
    const result = jwt.verify(token, secret);
    console.log('result', result);
    userId = result.sub as string;
  } catch {
    return res.status(401).send('Unauthorized');
  }
  /*-------------------------*/

  let fav = await FavoriteCharacters.findOne({ userId, characterId });
  console.log({ userId, characterId, fav });

  const response = await getCharacter(characterId);

  res.status(response.status).json({
    ...response.data,
    isFav: !!fav,
  });
}

export async function toggleCharacterFav(req: Request, res: Response) {
  const characterId = parseInt((req.params as { id: string }).id, 10);

  // TODO: CODIGO REPETIDO
  const secret = process.env.SECRET;
  if (!secret) {
    return res.status(500).json({});
  }

  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized');
  }

  console.log('antes', req.headers.authorization);
  const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
  console.log('token', token);
  let userId: string = '';
  try {
    const result = jwt.verify(token, secret);
    console.log('result', result);
    userId = result.sub as string;
  } catch {
    return res.status(401).send('Unauthorized');
  }
  /*-------------------------*/

  let fav = await FavoriteCharacters.findOne({ userId, characterId });
  const isFav = !!fav;

  if (!fav) {
    fav = new FavoriteCharacters({ userId, characterId });
    await fav.save();
  } else {
    fav.remove();
  }

  return res.status(200).json({ isFav });
}
