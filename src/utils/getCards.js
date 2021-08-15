import { getMetadata } from './metadata';

const GAME_MODE = 'IMAGE'; // right now we use images

export default async function getCards() {
	const widgets = await miro.board.widgets.get({ type: GAME_MODE });
	return widgets.filter((widget) => getMetadata(widget).type === 'card');
}
