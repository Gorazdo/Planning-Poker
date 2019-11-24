import { h } from 'preact';
import style from './style';

const Controls = ({ onRestart, onReveal }) => (
	<nav class={style.wrapper}>
		<button
			type="button"
			class="miro-btn miro-btn--primary miro-btn--small"
			onClick={onReveal}
		>
			Reveal
		</button>
		<button
			class="miro-btn miro-btn--secondary miro-btn--small"
			type="button"
			onClick={onRestart}
		>
			Clear
		</button>
	</nav>
);

export default Controls;
