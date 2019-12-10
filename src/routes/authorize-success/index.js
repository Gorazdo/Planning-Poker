import { h, Component } from 'preact';
import AppWelcome from 'components/AppWelcome';

class AuthorizeSuccess extends Component {
	componentDidMount() {
		if (window.opener) {
			window.opener.miroAuthorized();
		}
	}

	render() {
		return (
			<AppWelcome
				title="Planning poker widget"
				description="You can use the plugin now!"
			>
				<a href="https://miro.com/app/dashboard/">Go to Miro dashboard</a>
			</AppWelcome>
		);
	}
}

export default AuthorizeSuccess;
