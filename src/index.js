import './style';
import App from './components/app';
import { h } from 'preact';
import habitat from 'preact-habitat';

let poly = require('preact-cli/lib/lib/webpack/polyfills');

let _habitat = habitat(App);

_habitat.render({
	selector: '[data-widget-host="habitat"]',
	clean: true,
});
