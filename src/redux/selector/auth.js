export const getLoggedIn = (state) => !!state.auth?.token;

export const getLoadingState = (state) => state.auth?.isLoading;

export const getStatus = (state) => state.auth?.status;

export const getUser = (state) => state.auth?.user;

export const getContacts = (state) => state.auth?.contacts;

export const getContactsGroups = (state) => state.auth?.groups;

export const getUserId = (state) => state.auth?.user?._id;
