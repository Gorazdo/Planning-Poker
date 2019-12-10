/* eslint-disable brace-style */
import { h, Component } from 'preact';
import AppWelcome from 'components/AppWelcome';

const authorizeOptions = {
	response_type: 'token',
	redirect_uri: 'https://' + window.location.host + '/authorize-success',
};

class Authorizer extends Component {
	handleAuthorize = async () => {
		await miro.authorize(authorizeOptions);
		const token = await miro.getToken();
		if (token) {
			miro.board.ui.closeModal('success');
		} else {
			// eslint-disable-next-line no-console
			console.log('Something went wrong');
		}
	};

	render() {
		return (
			<AppWelcome
				title="Planning poker widget"
				description="To use the widget, please authorize it in your account"
			>
				<button
					type="button"
					class="miro-btn miro-btn--primary miro-btn--medium"
					onClick={this.handleAuthorize}
				>
					Authorize app
				</button>
			</AppWelcome>
		);
	}
}

export default Authorizer;
