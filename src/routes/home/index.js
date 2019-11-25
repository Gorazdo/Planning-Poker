import { h, Component } from 'preact';
import style from './style';

import icon24 from 'assets/icons/icon24.svg';
import icon48 from 'assets/icons/icon48.svg';

const startApp = () => {
	miro.board.openLibrary('Poker Planning', 'sidebar');
	miro.board.ui.openBottomPanel('bottomPanel', { width: 208 });
};

class Home extends Component {
	componentDidMount() {
		miro.onReady(() => {
			miro.initialize({
				extensionPoints: {
					toolbar: {
						title: 'Poker Planning',
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
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
			</div>
		);
	}
}
export default Home;
