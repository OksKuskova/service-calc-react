export const OverlayType = {
	LOADING: 'loading',
	SUCCESS: 'success',
} as const;

export const OverlayText = {
	[OverlayType.LOADING]: 'Загрузка...',
	[OverlayType.SUCCESS]: 'Заказ успешно оформлен',
}

export const OVERLAY_DURATION = 10000;