export default function createShape(canvasX, canvasY, color, text) {
	return miro.board.widgets.create({
		type: 'shape',
		text,
		x: canvasX,
		y: canvasY,
		style: {
			textColor: '#fff',
			backgroundColor: '#' + color,
			borderColor: 'transparent',
		},
	});
}
