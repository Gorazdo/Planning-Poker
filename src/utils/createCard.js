import { APP_ID } from 'constatns';

const X_STEP = 10;
const Y_STEP = 20;

const bindBy = (value, step) => Math.round(value / step) * step;

export default function createCard({ x, y, url, metadata }) {
	return miro.board.widgets.create({
		type: 'image',
		url,
		x: bindBy(x, X_STEP),
		y: bindBy(y, Y_STEP),
		capabilities: {
			editable: false,
		},
		metadata: {
			[APP_ID]: metadata,
		},
	});
}
