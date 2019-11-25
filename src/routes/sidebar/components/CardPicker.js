import { h, Fragment, Component, createRef } from 'preact';
import style from './style';
import Controls from 'components/Controls';
import { getMetadata } from 'utils/metadata';
import getBackCardUrl from 'utils/getBackCardUrl';
import CardsList from './CardsList';
import ChosenCard from './ChosenCard';
import { CARDS_MAP } from 'appconstants';
import getCards from 'utils/getCards';
import createCard from 'utils/createCard';
import Placeholder from 'components/Placeholder';

// eslint-disable-next-line no-magic-numbers
const RATIO = 3 / 2;
// const WIDTH = 100;

export default class Cards extends Component {
	state = {
		time: Date.now(),
		count: 10,
		loading: true,
		error: null,
		chosenCard: null,
		showList: true,
	};

	ref = createRef();

	onReady = () => {
		let cardValue;
		let url;
		miro.board.ui.initDraggableItemsContainer(this.ref.current, {
			draggableItemSelector: `.${style.card}`,
			onClick: el => {
				cardValue = el.dataset.value;
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
				this.hideList();
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
				const [card] = added;
				this.setChosenCard(card);
			},
		});
	};

	setChosenCard = (widget, stateCallback) => {
		const chosenCard = CARDS_MAP[getMetadata(widget).value];
		this.setState({ chosenCard, showList: false }, stateCallback);
	};

	hideList = () => {
		this.setState({ showList: false });
	};

	showList = () => {
		this.setState({ showList: true });
	};

	clearChosenCard = stateCallback => {
		this.setState({ chosenCard: null, showList: true }, stateCallback);
	};

	handleBeforeClear = async () => {
		this.clearChosenCard();
	};

	handleReveal = async () => {};

	init = async () => {
		try {
			const [id, cards] = await Promise.all([
				miro.currentUser.getId(),
				getCards(),
			]);
			const myCard = cards.find(widget => getMetadata(widget).author === id);
			if (myCard) {
				this.setChosenCard(myCard);
			}
			// eslint-disable-next-line react/no-did-mount-set-state
			this.setState({ id, loading: false }, () => {
				miro.onReady(this.onReady);
			});
		} catch (error) {
			console.error(error);
			// eslint-disable-next-line react/no-did-mount-set-state
			this.setState({
				error: error.toString(),
			});
		}
	};

	componentDidMount() {
		this.init();
	}

	render({}, { chosenCard, showList, loading, error }) {
		if (error) {
			return (
				<Placeholder severity="error" title="An error occured">
					<code>{error}</code>
				</Placeholder>
			);
		}
		return (
			<Fragment>
				<div class={style.controlsWrapper}>
					<Controls
						onReveal={this.handleReveal}
						onBeforeClear={this.handleBeforeClear}
					/>
				</div>
				<div ref={this.ref} class={style.wrapper}>
					{!chosenCard && !loading && <CardsList disabled={!showList} />}
				</div>
				{Boolean(chosenCard) && <ChosenCard {...chosenCard} />}
			</Fragment>
		);
	}
}
