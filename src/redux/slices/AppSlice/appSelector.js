export const getLoggedIn = (state) => !!state.app?.token;

export const getLoadingState = (state) => state.app?.isLoading;

export const getStatus = (state) => state.app?.status;
