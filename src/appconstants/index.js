export const APP_ID = '3074457347007443177';

/* eslint-disable no-magic-numbers */
export const CARDS_BACK_INDEXES = [1, 2, 3, 4, 5, 6];

const CARDS_FRONT_ENTRIES = [
	['0', 0],
	['½', 0.5],
	['1', 1],
	['2', 2],
	['3', 3],
	['5', 5],
	['8', 8],
	['13', 13],
	['20', 20],
	['40', 40],
	['100', 100],
	['∞', 'infinity'],
	['?', 'question'],
	['☕', 'coffee'],
];

const entriesToObjectMap = ([label, value]) => ({ label, value });

export const CARDS_LIST = CARDS_FRONT_ENTRIES.map(entriesToObjectMap);

export const CARDS_MAP = CARDS_LIST.reduce((acc, item) => {
	acc[item.value] = item;
	return acc;
}, {});
