/* eslint-disable brace-style */
import { h, Fragment, Component, createRef } from 'preact';
import style from './style';
import Controls from 'components/Controls';
import getCardURL from 'utils/getCardURL';
import { getMetadata, updateMetadata } from 'utils/metadata';
import getBackCardUrl from 'utils/getBackCardUrl';
import CardsList from './CardsList';
import ChosenCard from './ChosenCard';
import { CARDS_MAP } from 'constatns';
import getCards from 'utils/getCards';
import createCard from 'utils/createCard';

// eslint-disable-next-line no-magic-numbers
const RATIO = 3 / 2;
const WIDTH = 100;
function createShape(canvasX, canvasY, color, text) {
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

export default class Cards extends Component {
	state = {
		time: Date.now(),
		count: 10,
		chosenCard: null,
	};

	ref = createRef();

	onReady = () => {
		let cardValue;
		let url;
		miro.board.ui.initDraggableItemsContainer(this.ref.current, {
			draggableItemSelector: `.${style.card}`,
			onClick: el => {
				cardValue = el.dataset.value;
				console.log(el);
			},
			getDraggableItemPreview: el => {
				url = getBackCardUrl();
				cardValue = el.dataset.value;
				return {
					width: el.offsetWidth,
					height: el.offsetWidth * RATIO,
					url,
				};
			},
			onDrop: async (x, y) => {
				const metadata = {
					type: 'card',
					side: 'back',
					value: cardValue,
					author: this.state.id,
				};
				const added = await createCard({
					x,
					y,
					url,
					metadata,
				});
				console.log(added);
				const [card] = added;
				this.setChosenCard(card);
			},
		});
	};

	setChosenCard = (widget, stateCallback) => {
		const chosenCard = CARDS_MAP[getMetadata(widget).value];
		this.setState({ chosenCard }, stateCallback);
	};

	handleReveal = async () => {
		const cards = await getCards();

		const backCards = cards.filter(
			widget => getMetadata(widget).side === 'back'
		);
		const { x, y } = backCards.reduce(
			(acc, widget, index, { length }) => {
				acc.x = acc.x + widget.x / length;
				acc.y = Math.max(acc.y, widget.y);
				return acc;
			},
			{ x: 0, y: 0 }
		);
		console.log(x, y);
		const result = backCards.reduce((acc, widget) => {
			const { value } = getMetadata(widget);
			if (value in acc) {
				acc[value]++;
			} else {
				acc[value] = 1;
			}

			return acc;
		}, {});

		createShape(x, y, '#ccc', JSON.stringify(result));

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
		console.log(result, 'Done!');
	};

	async componentDidMount() {
		const [id, cards] = await Promise.all([
			miro.currentUser.getId(),
			getCards(),
		]);
		console.log(cards, id);
		const myCard = cards.find(widget => getMetadata(widget).author === id);
		if (myCard) {
			this.setChosenCard(myCard);
		}
		// eslint-disable-next-line react/no-did-mount-set-state
		this.setState({ id }, () => {
			miro.onReady(this.onReady);
		});
	}

	render() {
		return (
			<Fragment>
				<div class={style.controlsWrapper}>
					<Controls onReveal={this.handleReveal} />
				</div>
				<div ref={this.ref} class={style.wrapper}>
					<CardsList />
				</div>
				{this.state.chosenCard && <ChosenCard {...this.state.chosenCard} />}
			</Fragment>
		);
	}
}
