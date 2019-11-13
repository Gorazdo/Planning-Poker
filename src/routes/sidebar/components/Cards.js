import { h, Component, createRef } from 'preact';
import style from './style';
import svgToDataURL from 'mini-svg-data-uri';
import htmlToImage from 'html-to-image';

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

const svg =
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M22 38V51L32 32l19-19v12C44 26 43 10 38 0 52 15 49 39 22 38z"/></svg>';

const optimizedSVGDataURI = svgToDataURL(svg);

function createShape(canvasX, canvasY, color, text) {
	return miro.board.widgets.create({
		type: 'shape',
		text,
		x: canvasX,
		y: canvasY,
		style: {
			textColor: '#fff',
			backgroundColor: color,
			borderColor: 'transparent',
		},
	});
}

const Card = ({ label, value }) => (
	<div class={style.cardWrapper}>
		<button
			class={style.card}
			data-value={value}
			data-image-url="https://1556ec3d.ngrok.io/assets/icons/android-chrome-512x512.png"
		>
			<h4>{label}</h4>
			<code>{value}</code>
		</button>
	</div>
);

export default class Cards extends Component {
	state = {
		time: Date.now(),
		count: 10,
	};

	ref = createRef();

	onReady = () => {
		let currentShapeText;
		miro.board.ui.initDraggableItemsContainer(this.ref.current, {
			draggableItemSelector: `.${style.card}`,
			onClick: el => {
				console.log(el);
			},
			getDraggableItemPreview: el => {
				console.log('getDraggableItemPreview', el, optimizedSVGDataURI);
				currentShapeText = el.innerText;

				return {
					width: 100,
					height: 100,
					backgroundColor: '#ffdd00',
					url: this.svgMap.get(el.dataset.value),
				};
			},
			onDrop: (canvasX, canvasY) => {
				console.log('onDrop 2');
				createShape(canvasX, canvasY, '#cccc55', currentShapeText);
			},
		});
	};

	componentDidMount() {
		const filter = node => node.tagName !== 'CODE';
		miro.onReady(this.onReady);
		this.svgMap = new Map();
		const cardsCollection = this.ref.current.getElementsByClassName(
			style.card
		);
		asyncForEach(cardsCollection, async theCard => {
			const { value } = theCard.dataset;
			const url = await htmlToImage.toSvgDataURL(theCard, { filter });
			this.svgMap.set(value, url);
		});
	}

	render() {
		return (
			<div ref={this.ref} class={style.wrapper}>
				{CARDS_DATA.map(({ label, value }) => (
					<Card key={value} label={label} value={value} />
				))}
			</div>
		);
	}
}

const CARDS_DATA = [
	{
		label: '1/2',
		value: 0.5,
	},
	{
		label: '1',
		value: 1,
	},
	{
		label: '2',
		value: 2,
	},
	{
		label: '3',
		value: 3,
	},
	{
		label: '5',
		value: 5,
	},
	{
		label: '10',
		value: 10,
	},
	{
		label: '20',
		value: 20,
	},
	{
		label: '40',
		value: 40,
	},
	{
		label: '100',
		value: 100,
	},
];
