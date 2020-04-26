import { h, Fragment, Component, createRef } from 'preact';
import style from './style';
import Controls from 'components/Controls';
import { getMetadata } from 'utils/metadata';
import getBackCardUrl from 'utils/getBackCardUrl';
import CardsList from './CardsList';
import ChosenCard from './ChosenCard';
import getCards from 'utils/getCards';
import createCard from 'utils/createCard';
import Placeholder from 'components/Placeholder';
import CardBacksPreloader from './CardBacksPreloader';

// eslint-disable-next-line no-magic-numbers
const RATIO = 3 / 2;
// const WIDTH = 100;

export default class Cards extends Component {
	state = {
		time: Date.now(),
		count: 10,
		loading: true,
		error: null,
		chosenCardWidget: null,
		showList: true,
	};

	ref = createRef();

	onReady = () => {
		let cardValue;
		let url;
		miro.board.ui.initDraggableItemsContainer(this.ref.current, {
			draggableItemSelector: `.${style.card}`,
			onClick: (el) => {
				cardValue = el.dataset.value;
			},
			getDraggableItemPreview: (el) => {
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
		const chosenCardWidget = widget;
		this.setState({ chosenCardWidget, showList: false }, stateCallback);
		this.checkCardExistence(widget.id);
	};

	checkCardExistence = async (id) => {
		try {
			// if it's updating -- it exists
			await miro.board.widgets.update([{ id }]);
			setTimeout(this.checkCardExistence, 1000, id);
		} catch (error) {
			// if it's an error -- it does not exist
			this.clearChosenCard();
		}
	};

	hideList = () => {
		this.setState({ showList: false });
	};

	showList = () => {
		this.setState({ showList: true });
	};

	clearChosenCard = (stateCallback) => {
		this.setState({ chosenCardWidget: null, showList: true }, stateCallback);
	};

	handleBeforeClear = async () => {
		this.clearChosenCard();
	};

	handleReveal = async () => {};

	init = async () => {
		if (!miro.currentUser) {
			return this.setState({
				error: 'Seems like the app is running not as a part of Miro board',
			});
		}
		try {
			const [id, cards] = await Promise.all([
				miro.currentUser.getId(),
				getCards(),
			]);
			const myCard = cards.find((widget) => getMetadata(widget).author === id);
			if (myCard) {
				this.setChosenCard(myCard);
			}
			// eslint-disable-next-line react/no-did-mount-set-state
			this.setState({ id, loading: false }, () => {
				// console.log(WIDGETS_DELETED);
				// miro.addListener(WIDGETS_DELETED, this.onWidgetsDeleted);
			});
		} catch (error) {
			console.error(error);
			// eslint-disable-next-line react/no-did-mount-set-state
			this.setState({
				error: error.toString(),
			});
		}
	};

	onWidgetsDeleted = (event) => {
		const { data: widgets } = event;
		const { chosenCardWidget } = this.state;
		if (!chosenCardWidget) {
			return false;
		}
		if (widgets.find((widget) => widget.id === chosenCardWidget.id)) {
			this.clearChosenCard();
		}
	};

	componentDidMount() {
		miro.onReady(() => {
			this.onReady();
			this.init();
		});
	}

	render({}, { chosenCardWidget, showList, loading, error }) {
		if (error) {
			return (
				<Placeholder severity="error" title="Oooops...">
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
					{!chosenCardWidget && <CardsList disabled={!showList || loading} />}
				</div>
				{Boolean(chosenCardWidget) && (
					<ChosenCard chosenCardWidget={chosenCardWidget} />
				)}
				<CardBacksPreloader />
			</Fragment>
		);
	}
}
