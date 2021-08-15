import { h, Component } from 'preact';
import style from './style';
import getCards from 'utils/getCards';
import { getMetadata, updateMetadata } from 'utils/metadata';
import getCardURL from 'utils/getCardURL';

class Controls extends Component {
	handleReveal = async (event) => {
		if (typeof this.props.onBeforeReveal === 'function') {
			this.props.onBeforeReveal(event);
		}
		const cards = await getCards();
		const backCards = cards.filter(
			(widget) => getMetadata(widget).side === 'back'
		);

		const updates = backCards.map((widget) => {
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

		if (typeof this.props.onReveal === 'function') {
			this.props.onReveal();
		}
	};

	handleClear = async (event) => {
		if (typeof this.props.onBeforeClear === 'function') {
			this.props.onBeforeClear(event);
		}

		const cards = await getCards();

		const allCardIds = cards
			.filter((widget) => getMetadata(widget).type === 'card')
			.map((widget) => widget.id);

		miro.board.widgets.deleteById(allCardIds);
		// deleteById does not return a list of deleted ids

		// eslint-disable-next-line no-console
		console.log('deleted', allCardIds.length, 'cards');
		if (typeof this.props.onClear === 'function') {
			this.props.onClear();
		}
	};

	handleClose = async () => {
		try {
			await miro.board.ui.closeBottomPanel();
		} catch {
			console.error('Something went wrong');
		}
	};

	render({ showClose }) {
		return (
			<nav class={style.wrapper}>
				<button
					type="button"
					class="miro-btn miro-btn--primary miro-btn--small"
					onClick={this.handleReveal}
				>
					Reveal all
				</button>
				<button
					class="miro-btn miro-btn--secondary miro-btn--small"
					type="button"
					onClick={this.handleClear}
				>
					Clear all
				</button>
				{Boolean(showClose) && (
					<button
						class="miro-btn miro-btn--secondary-flat miro-btn--small"
						type="button"
						title="Close panel"
						style={{ width: '36px', 'margin-left': '6px' }}
						onClick={this.handleClose}
					>
						✖
					</button>
				)}
			</nav>
		);
	}
}

export default Controls;

/*
const roundResults = backCards =>
	backCards.reduce((acc, widget) => {
		const { value } = getMetadata(widget);
		if (value in acc) {
			acc[value]++;
		} else {
			acc[value] = 1;
		}

		return acc;
	}, {});

const resultShapePoint = backCards =>
	backCards.reduce(
		(acc, widget, index, { length }) => {
			acc.x = acc.x + widget.x / length;
			acc.y = Math.max(acc.y, widget.y);
			return acc;
		},
		{ x: 0, y: 0 }
	);

	*/
