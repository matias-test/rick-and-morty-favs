import { Router } from "express"
import { fetchCharacter, listCharacters, toggleCharacterFav } from '../controllers/characters';

const router: Router = Router()

router.get('/characters', listCharacters);

router.get('/characters/:id', fetchCharacter);

router.post('/characters/:id/toggle-fav', toggleCharacterFav);

export default router
