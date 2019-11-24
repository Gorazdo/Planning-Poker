import { h, Fragment, Component, createRef } from 'preact';
import Card from './Card';
import { CARDS_LIST } from 'appconstants';

const CardsList = ({ disabled }) => (
	<Fragment>
		{CARDS_LIST.map(({ label, value }, index, cards) => (
			<Card
				key={value}
				disabled={disabled}
				label={label}
				value={value}
				index={index}
				cards={cards}
			/>
		))}
	</Fragment>
);
export default CardsList;
