/* eslint-disable brace-style */
import { h, Fragment, Component, createRef } from 'preact';
import style from './style';
import Controls from 'components/Controls';
import getCardURL from 'utils/getCardURL';
const svgToMiniDataURI = require('mini-svg-data-uri');
import backSvg from 'assets/cards/back.svg';
import { getMetadata, updateMetadata } from 'utils/metadata';

// eslint-disable-next-line no-magic-numbers
const RATIO = 3 / 2;
const WIDTH = 100;

function createImage({ x, y, url, metadata }) {
	return miro.board.widgets.create({
		type: 'image',
		url,
		x,
		y,
		capabilities: {
			editable: false,
		},
		metadata: {
			[process.env.APP_ID]: metadata,
		},
	});
}

const Card = ({ label, value }) => {
	const url = getCardURL('face', value);
	return (
		<div class={style.cardWrapper}>
			<button
				class={style.card}
				data-value={value}
				type="button"
				style={{
					backgroundImage: `url(${url})`,
				}}
				data-image-url={url}
			/>
		</div>
	);
};

const getCards = async () => {
	const widgets = await miro.board.widgets.get();
	return widgets.filter(widget => getMetadata(widget).type === 'card');
};

export default class Cards extends Component {
	state = {
		time: Date.now(),
		count: 10,
	};

	ref = createRef();

	onReady = () => {
		let cardValue;
		miro.board.ui.initDraggableItemsContainer(this.ref.current, {
			draggableItemSelector: `.${style.card}`,
			onClick: el => {
				cardValue = el.dataset.value;
				console.log(el);
			},
			getDraggableItemPreview: el => {
				cardValue = el.dataset.value;
				return {
					width: el.offsetWidth,
					height: el.offsetWidth * RATIO,
					background: '#ccc',
					url: svgToMiniDataURI(backSvg),
				};
			},
			onDrop: async (x, y) => {
				const url = getCardURL('back');
				const metadata = {
					type: 'card',
					side: 'back',
					value: cardValue,
					author: this.state.id,
				};
				const added = await createImage({
					x,
					y,
					url,
					metadata,
				});
				console.log(added);
			},
		});
	};

	handleReveal = async () => {
		const cards = await getCards();

		const backCards = cards.filter(
			widget => getMetadata(widget).side === 'back'
		);

		const updates = backCards.map(widget => {
			const { id } = widget;
			const { value } = getMetadata(widget);
			return {
				id,
				metadata: updateMetadata(widget, {
					side: 'face',
				}),
				url: getCardURL('face', value),
			};
		});
		await miro.board.widgets.update(updates);
		console.log('Done!');
	};

	async componentDidMount() {
		const id = await miro.currentUser.getId();
		// eslint-disable-next-line react/no-did-mount-set-state
		this.setState({ id });
		miro.onReady(this.onReady);
	}

	render() {
		return (
			<Fragment>
				<Controls onReveal={this.handleReveal} />
				<div ref={this.ref} class={style.wrapper}>
					{CARDS_DATA.map(({ label, value }) => (
						<Card key={value} label={label} value={value} />
					))}
				</div>
			</Fragment>
		);
	}
}

const CARDS_DATA = [
	{
		label: '0',
		value: 0,
	},
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
	{
		label: 'coffee',
		value: 'coffee',
	},
	{
		label: 'infinity',
		value: 'infinity',
	},
];
