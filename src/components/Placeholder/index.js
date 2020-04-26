import { h } from 'preact';
import style from './style';

const handleReload = () => {
	if (window.opener) {
		window.opener.location.reload(false);
	} else {
		window.location.reload(false);
	}
};

const Placeholder = ({ severity, title, children }) => (
	<section class={style.wrapper} data-severity={severity}>
		<h4 class="miro-h4">{title}</h4>
		{children}
		{severity === 'error' && (
			<button
				onClick={handleReload}
				type="button"
				class="miro-btn miro-btn--primary miro-btn--medium"
			>
				Reload board
			</button>
		)}
	</section>
);

export default Placeholder;
