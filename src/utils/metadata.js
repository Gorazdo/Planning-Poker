const { APP_ID } = process.env;

export const getMetadata = widget => widget.metadata[APP_ID];
export const updateMetadata = (widget, nextMetadata) => {
	return {
		...widget.metadata,
		[APP_ID]: {
			...widget.metadata[APP_ID],
			...nextMetadata,
		},
	};
};

export const setMetadata = (widget, nextMetadata) => {
	return {
		...widget.metadata,
		[APP_ID]: nextMetadata,
	};
};
