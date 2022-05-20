export const error = <T>(error: T): T => {
	console.error(error);
	return error;
};

export const debug = <T>(message: T): T => {
	console.debug(message);
	return message;
};

export const log = <T>(message: T): T => {
	console.log(message);
	return message;
};
