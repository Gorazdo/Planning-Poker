import { h, Component } from 'preact';
import style from './style';
import getCards from 'utils/getCards';
import { getMetadata, updateMetadata } from 'utils/metadata';
import createShape from 'utils/createShape';
import getCardURL from 'utils/getCardURL';

class Controls extends Component {
	handleReveal = async event => {
		this.props.onBeforeReveal(event);
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
		this.props.onReveal();
	};

	handleClear = async event => {
		this.props.onBeforeClear(event);

		const cards = await getCards();

		const allCards = cards.filter(
			widget => getMetadata(widget).type === 'card'
		);
		const deleted = await Promise.all(
			allCards.map(widget => miro.board.widgets.deleteById(widget.id))
		);
		console.log('deleted', deleted.length, 'cards');
		this.props.onClear();
	};

	render() {
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
					Clear
				</button>
			</nav>
		);
	}
}

export default Controls;
