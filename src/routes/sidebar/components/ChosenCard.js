import { h, Component } from 'preact';
import Card from './Card';
import style from './style';

export default class ChosenCard extends Component {
	handleSwap = async event => {
		if (typeof this.props.onBeforeSwap === 'function') {
			this.props.onBeforeSwap(event);
		}
		try {
			await miro.board.widgets.deleteById(this.props.id);
			if (typeof this.props.onSwap === 'function') {
				this.props.onSwap(event);
			}
		} catch (error) {
			if (typeof this.props.onError === 'function') {
				this.props.onError(error);
			}
		}
	};

	render({ value, label }) {
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
