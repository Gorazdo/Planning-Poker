import { h, Component } from 'preact';
import style from './style';
import getCardURL from 'utils/getCardURL';

const DELAY_ANIMATION = 50;

class Card extends Component {
	state = {
		loaded: false,
	};

	handleLoad = e => {
		this.setState({ loaded: true });
	};

	render({ value, disabled, label, index, cards = [] }) {
		const url = getCardURL('face', value);
		const delay = (cards.length - index) * DELAY_ANIMATION;

		return (
			<div class={style.cardWrapper} style={{ animationDelay: `-${delay}ms` }}>
				<button
					class={style.card}
					title={label}
					disabled={Boolean(disabled)}
					data-loaded={this.state.loaded ? 'yes' : 'no'}
					data-value={value}
					type="button"
					style={{
						backgroundImage: `url(${url})`,
					}}
					data-image-url={url}
				>
					<span>{label}</span>
				</button>
				<img class={style.hiddenImg} onLoad={this.handleLoad} src={url} />
			</div>
		);
	}
}

export default Card;
