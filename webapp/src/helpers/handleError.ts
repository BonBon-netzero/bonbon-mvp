import { AxiosError } from "axios";

export const getAxiosErrorMessage = (error: AxiosError): string => {
  if (!error?.response?.data) return `An error occurs. Please try again`;
  return (error.response.data as any).message;
};
