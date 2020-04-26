import { h, Component } from 'preact';
import style from './style';
import getCards from 'utils/getCards';
import { getMetadata } from 'utils/metadata';
import Controls from '../../components/Controls';

export default class Sidebar extends Component {
	state = {
		time: 1,
	};

	get CANVAS_CLICKED() {
		return miro.enums.event.CANVAS_CLICKED;
	}

	onCanvasClicked = async () => {
		const cards = await getCards();

		const allCards = cards.filter(
			(widget) => getMetadata(widget).type === 'card'
		);

		if (allCards.length === 0) {
			miro.board.ui.closeBottomPanel();
		}
	};

	componentDidMount() {
		miro.addListener(this.CANVAS_CLICKED, this.onCanvasClicked);
	}

	componentWillUnmount() {
		miro.removeListener(this.CANVAS_CLICKED, this.onCanvasClicked);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render() {
		return (
			<div class={style.sidebar}>
				<Controls showClose />
			</div>
		);
	}
}
