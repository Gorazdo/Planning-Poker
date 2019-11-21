const { BASE_URL } = process.env;

export default (side, value = '') =>
	`${window.location.origin}/assets/cards/${side}${value}.svg`;
