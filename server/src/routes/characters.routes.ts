import { Router } from "express"
import { fetchCharacter, listCharacters, toggleCharacterFav } from '../controllers/characters';

const router: Router = Router()

router.get('/', listCharacters);
router.get('/:id', fetchCharacter);
router.post('/:id/toggle-fav', toggleCharacterFav);

export default router
