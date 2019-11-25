/* eslint-disable brace-style */
import { h, Component, createRef } from 'preact';
import icon48 from 'assets/icons/icon48.svg';
import style from './style';

const authorizeOptions = {
	response_type: 'token',
	redirect_uri: 'https://' + window.location.host + '/authorize-success',
};

class Authorizer extends Component {
	ref = createRef();

	handleAuthorize = async event => {
		await miro.authorize(authorizeOptions);
		const token = await miro.getToken();
		if (token) {
			miro.board.ui.closeModal('success');
		} else {
			console.log('Something went wrong');
		}
	};

	componentDidMount() {
		if (this.ref.current) {
			this.ref.current.innerHTML = icon48;
		}
	}

	render() {
		return (
			<section class={style.wrapper}>
				<h2 class="miro-h2">Poker planning widget</h2>
				<p class="miro-p">
					To use the widget, please authorize it in your account
				</p>
				<div class={style.svgWrapper}>
					<svg class={style.svg} ref={this.ref} />
				</div>
				<button
					type="button"
					class="miro-btn miro-btn--primary miro-btn--medium"
					onClick={this.handleAuthorize}
				>
					Authorize app
				</button>
			</section>
		);
	}
}

export default Authorizer;
