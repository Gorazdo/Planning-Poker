import { h, Component } from 'preact';
import Card from './Card';
import style from './style';
import { CARDS_MAP } from 'appconstants';
import { getMetadata } from 'utils/metadata';

export default class ChosenCard extends Component {
	handleSwap = async event => {
		if (typeof this.props.onBeforeSwap === 'function') {
			this.props.onBeforeSwap(event);
		}
		try {
			await miro.board.widgets.deleteById([this.props.chosenCardWidget.id]);
			if (typeof this.props.onSwap === 'function') {
				this.props.onSwap(event);
			}
		} catch (error) {
			console.error(this.props.chosenCardWidget.id);
			console.error(error);
			if (typeof this.props.onError === 'function') {
				this.props.onError(error);
			}
		}
	};

	render({ chosenCardWidget }) {
		const { value, label } = CARDS_MAP[getMetadata(chosenCardWidget).value];
		return (
			<section class={style.chosenCardWrapper}>
				<h4 class="miro-h2">Your card</h4>

				<Card value={value} label={label} disabled />

				<button
					onClick={this.handleSwap}
					type="button"
					class="miro-btn miro-btn--secondary miro-btn--small"
				>
					Swap
				</button>
			</section>
		);
	}
}
