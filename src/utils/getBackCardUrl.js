import getCardURL from './getCardURL';
import getRandomInteger from './getRandomInteger';

// it's better to read from fs
const BACK_CARD_MAX_NUMBER = 6;

export default function getBackCardUrl() {
	const value = getRandomInteger(1, BACK_CARD_MAX_NUMBER);
	return getCardURL('back', value);
}
