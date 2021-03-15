import { h, Component } from 'preact';

import icon24 from 'assets/icons/icon24.svg';
import icon48 from 'assets/icons/icon48.svg';
import AppWelcome from 'components/AppWelcome';
import { APP_ID } from 'appconstants';

const startApp = () => {
	miro.board.openLibrary('Planning Poker', 'sidebar');
	miro.board.ui.openBottomPanel('bottomPanel', { width: 250 });
};

class Home extends Component {
	get installationURL() {
		const miroAuthURL = 'https://miro.com/oauth/authorize';
		return `${miroAuthURL}?response_type=code&client_id=${APP_ID}&redirect_uri=${window.location.origin}/authorize-success&external=true`;
	}

	handleInstall = () => {
		window.open(this.installationURL);
	};

	componentDidMount() {
		miro.onReady(() => {
			miro.initialize({
				extensionPoints: {
					toolbar: {
						title: 'Planning Poker',
						toolbarSvgIcon: icon24,
						librarySvgIcon: icon48,
						onClick: async () => {
							const authorized = await miro.isAuthorized();
							if (authorized) {
								startApp();
							} else {
								const res = await miro.board.ui.openModal('authorize');
								if (res === 'success') {
									startApp();
								}
							}
						},
					},
				},
			});
		});
	}

	render() {
		return (
			<AppWelcome title="Planning Poker">
				<button
					type="button"
					class="miro-btn miro-btn--primary miro-btn--medium"
					onClick={this.handleInstall}
				>
					Install the plugin
				</button>
			</AppWelcome>
		);
	}
}
export default Home;
