import { h } from 'preact';
import Card from './Card';
import style from './style';

const ChosenCard = ({ value, label, handleClear }) => (
	<section class={style.chosenCardWrapper}>
		<h4 class="miro-h4">Your card</h4>

		<Card value={value} label={label} />

		<button
			onClick={handleClear}
			type="button"
			class="miro-btn miro-btn--secondary miro-btn--small"
		>
			Swap
		</button>
	</section>
);

export default ChosenCard;
