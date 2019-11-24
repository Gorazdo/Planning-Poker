import { APP_ID } from 'constatns';

export const getMetadata = (widget, appId = APP_ID) => {
	if (!appId) {
		throw new Error('No appId specified');
	}
	return widget.metadata[appId] || {};
};
export const updateMetadata = (widget, nextMetadata, appId = APP_ID) => ({
	...widget.metadata,
	[appId]: {
		...widget.metadata[appId],
		...nextMetadata,
	},
});

export const setMetadata = (widget, nextMetadata, appId = APP_ID) => ({
	...widget.metadata,
	[appId]: nextMetadata,
});
