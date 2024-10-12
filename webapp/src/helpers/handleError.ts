import { AxiosError } from "axios";

export const getAxiosErrorMessage = (error: AxiosError): string => {
  if (!error?.response?.data) return `An error occurs. Please try again`;
  return (error.response.data as any).message;
};

export const getErrorMessage = (err: any) => {
  if (err.response) {
    return getAxiosErrorMessage(err);
  }
  return `An error occurs. Please try again`;
};
