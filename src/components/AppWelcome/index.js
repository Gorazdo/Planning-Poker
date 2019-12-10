/* eslint-disable brace-style */
import { h, Component, createRef } from 'preact';
import icon48 from 'assets/icons/icon48.svg';
import style from './style';

class AppWelcome extends Component {
	ref = createRef();

	componentDidMount() {
		if (this.ref.current) {
			this.ref.current.innerHTML = icon48;
		}
	}

	render({ title, description, children }) {
		return (
			<section class={style.wrapper}>
				<h2 class="miro-h2">{title}</h2>
				<p class="miro-p">{description}</p>
				<div class={style.svgWrapper}>
					<svg class={style.svg} ref={this.ref} />
				</div>
				{children}
			</section>
		);
	}
}

export default AppWelcome;
