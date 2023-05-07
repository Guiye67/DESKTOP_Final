/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PayloadAction } from '@reduxjs/toolkit';

export const persistanceMiddleware =
	(store: { getState: () => any }) =>
	(next: (arg0: any) => void) =>
	(action: PayloadAction) => {
		next(action);
		if (action.type === 'login/doLogin')
			localStorage.setItem(
				'logged__user',
				JSON.stringify(store.getState().login)
			);
	};
