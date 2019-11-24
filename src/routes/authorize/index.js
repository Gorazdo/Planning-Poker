import { h, Component } from 'preact';
const authorizeOptions = {
	response_type: 'token',
	redirect_uri:
		'http://' +
		window.location.host +
		'/plugins/board-cleaner/auth-success.html',
};

class Authorizer extends Component {
	handleAuthorize = async event => {
		await miro.authorize(authorizeOptions);
		const token = await miro.getToken();
		if (token) {
			miro.board.ui.closeModal('success');
		} else {
			console.log('Something went wrong');
		}
	};

	render() {
		return (
			<section>
				<button type="button" class="miro-btn" onClick={this.handleAuthorize}>
					Authorize app
				</button>
			</section>
		);
	}
}

export default Authorizer;
