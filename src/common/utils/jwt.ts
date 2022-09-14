import JWT from 'jsonwebtoken';
import { ENV } from '../config/config';



export const jwt = {
    sign : (payload: any) => JWT.sign(payload, ENV.TOKEN_KEY, ENV.TOKEN_TIME),
    verify : (token : string) => JWT.verify(token, ENV.TOKEN_KEY) 
}