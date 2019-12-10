import { h, Component } from 'preact';
import style from './style';
import Controls from '../../components/Controls';

export default class Sidebar extends Component {
	state = {
		time: 1,
	};

	// Note: `user` comes from the URL, courtesy of our router
	render() {
		return (
			<div class={style.sidebar}>
				<Controls showClose />
			</div>
		);
	}
}
