import './style';
import App from './components/app';
// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import habitat from 'preact-habitat';

// eslint-disable-next-line no-unused-vars
const poly = require('preact-cli/lib/lib/webpack/polyfills');

const _habitat = habitat(App);

_habitat.render({
	selector: '[data-widget-host="habitat"]',
	clean: true,
});
