import { CLEAR_USER, SET_USER, SET_CHANNEL } from "./types";
export const setUser = (user) => ({
  type: SET_USER,
  payload: {
    currentUser: user,
  },
});
export const clearUser = () => ({
  type: CLEAR_USER,
});
export const setChannel = (channel) => ({
  type: SET_CHANNEL,
  payload: {
    currentChannel: channel,
  },
});
