import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import appStyle from './app.less';
// Code-splitting is automated for routes
import Home from 'routes/home';
import Sidebar from 'routes/sidebar';
import BottomPanel from 'routes/bottomPanel';
import AuthorizeSuccess from 'routes/authorize-success';

export default class App extends Component {
	handleRoute = (e) => {
		this.currentUrl = e.url;
	};

	componentDidMount() {
		const path = localStorage.getItem('path');
		if (path) {
			localStorage.removeItem('path');
			route(path, true);
		}
	}

	render() {
		return (
			<div class={appStyle.wrapper}>
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Sidebar path="/sidebar/" user="me" />
					<BottomPanel path="/bottomPanel/" user="me" />
					<AuthorizeSuccess path="/authorize-success/" />
				</Router>
			</div>
		);
	}
}
