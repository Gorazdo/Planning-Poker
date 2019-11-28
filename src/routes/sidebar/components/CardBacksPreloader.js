import { h, Fragment } from 'preact';
import style from './style';
import getCardURL from 'utils/getCardURL';
import { CARDS_BACK_INDEXES } from 'appconstants';

const CardBacksPreloader = () => (
	<Fragment>
		{CARDS_BACK_INDEXES.map(index => (
			<img
				class={style.hiddenCard}
				key={index}
				src={getCardURL('back', index)}
			/>
		))}
	</Fragment>
);
export default CardBacksPreloader;
