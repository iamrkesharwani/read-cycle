import axios from 'axios';

export const getErrorMessage = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || defaultMessage;
  }
  return defaultMessage;
};
