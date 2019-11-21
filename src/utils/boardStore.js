export const read = async () => {
	const state = await miro.__getRuntimeState();
	return state;
};

export const write = async updater => {
	const state = await read();
	return miro.__setRuntimeState(updater(state));
};

export const setCard = card => state => ({
	...state,
	cards: {
		...state.cards,
		[card.id]: card,
	},
});
