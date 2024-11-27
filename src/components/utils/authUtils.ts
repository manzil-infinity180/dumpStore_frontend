import { NavigateFunction } from "react-router-dom";

export class APIError extends Error {
    status: number;
    info: string;
  
    constructor(message: string, status: number, info: string) {
      super(message);
      this.status = status;
      this.info = info;
  
      Object.setPrototypeOf(this, APIError.prototype);
    }
}
export const getCallMethod = async (url: string) => {
     const getResponse = await fetch(url, {
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });
      return getResponse;
}
/**
 * 
 * @param res 
 * Sending message what we are getting from backend server
 */
export const ErrorResponse = async (res: Response) => {
    const info = await res.json();
    const error = new APIError(
        info.message,
        res.status,
        info
    );
    throw error;
}
/**
 * 
 * @param res 
 * @param message 
 * Use this as your custom message 
 */
export const CustomErrorMessage = async (res: Response, message?: string,
    navigate?: NavigateFunction, navigatePath?: string) => {
    const info = await res.json();
     
    const error = new APIError(
        message? message : info.message,
        res.status,
        info
    );
    if(typeof(navigate) !== 'undefined' &&  typeof(navigatePath) !== 'undefined'){
        navigate(navigatePath);
    }
    throw error;
}