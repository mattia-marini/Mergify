export const dpr = window.devicePixelRatio || 1;

export function normalizeRect(x1, x2, y1, y2) {
	const minX = Math.min(x1, x2);
	const maxX = Math.max(x1, x2);

	const minY = Math.min(y1, y2);
	const maxY = Math.max(y1, y2);
	return [minX, minY, maxX, maxY];
}

export function getPointAndWidth(x1, x2, y1, y2) {
	const minX = Math.min(x1, x2);
	const maxX = Math.max(x1, x2);

	const minY = Math.min(y1, y2);
	const maxY = Math.max(y1, y2);

	return [minX, minY, maxX - minX, maxY - minY];
}

export function constraint(value, maxValue, minValue) { 
	return Math.max(Math.min(maxValue, value), minValue);
}