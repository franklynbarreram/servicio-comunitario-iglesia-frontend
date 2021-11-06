export function log(message?: any, ...optionalParams: any[]) {
	if (!process.env.NEXT_PUBLIC_ENABLE_LOG) return;
	console.log(message, ...optionalParams);
}
