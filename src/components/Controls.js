import { h } from 'preact';

const Controls = ({ onRestart, onReveal }) => (
	<nav>
		<button type="button" onClick={onRestart}>
			Start from scratch
		</button>
		<button type="button" onClick={onReveal}>
			Reveal!
		</button>
	</nav>
);

export default Controls;
