import { getMetadata } from './metadata';

export default async function getCards() {
	const widgets = await miro.board.widgets.get();
	return widgets.filter(widget => getMetadata(widget).type === 'card');
}
