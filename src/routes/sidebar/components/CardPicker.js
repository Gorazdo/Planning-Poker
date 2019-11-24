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
import createShape from 'utils/createShape';

// eslint-disable-next-line no-magic-numbers
const RATIO = 3 / 2;
const WIDTH = 100;

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

	clearChosenCard = stateCallback => {
		this.setState({ chosenCard: null }, stateCallback);
	};

	handleBeforeClear = async () => {
		this.clearChosenCard();
	};

	handleReveal = async () => {};

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
					<Controls
						onReveal={this.handleReveal}
						onBeforeClear={this.handleBeforeClear}
					/>
				</div>
				<div ref={this.ref} class={style.wrapper}>
					{!this.state.chosenCard && <CardsList />}
				</div>
				{Boolean(this.state.chosenCard) && (
					<ChosenCard {...this.state.chosenCard} />
				)}
			</Fragment>
		);
	}
}
