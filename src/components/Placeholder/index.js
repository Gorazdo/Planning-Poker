import { h } from 'preact';
import style from './style';

const Placeholder = ({ severity, title, children }) => (
	<section class={style.wrapper} data-severity={severity}>
		<h4 class="miro-h4">{title}</h4>
		{children}
	</section>
);

export default Placeholder;
