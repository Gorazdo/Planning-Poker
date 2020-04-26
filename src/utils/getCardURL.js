const cardNameMapping = {
	back: 'leaf',
	back1: 'blue moon',
	back2: 'happy face',
	back3: 'flora',
	back4: 'pirate',
	back5: 'candy',
	back6: 'diamonds',
	'face0.5': 'half story point',
	face0: '0 story points',
	face1: '1 story point',
	face2: '2 story points',
	face3: '3 story points',
	face5: '5 story points',
	face8: '8 story points',
	face13: '13 story points',
	face20: '20 story points',
	face40: '40 story points',
	face100: '100 story points',
	facecoffee: 'need a break',
	faceinfinity: 'impossible task',
	facequestion: 'idk',
};

export default (side, value = '') => {
	const humanReadableName = encodeURIComponent(
		cardNameMapping[`${side}${value}`]
	);
	return `${window.location.origin}/assets/cards/${humanReadableName}.svg`;
};
