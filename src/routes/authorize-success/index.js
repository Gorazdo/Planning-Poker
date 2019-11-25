import { h, Component } from 'preact';

class AuthorizeSuccess extends Component {
	componentDidMount() {
		if (window.opener) {
			window.opener.miroAuthorized();
		}
	}

	render() {
		return <section>Authorized!</section>;
	}
}

export default AuthorizeSuccess;
