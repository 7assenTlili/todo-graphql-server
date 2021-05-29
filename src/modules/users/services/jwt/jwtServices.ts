// @ts-ignore
import * as jwt from "jsonwebtoken";
import config from "../../../../config";

export interface JWTClaims {
  _id: string;
  email: string;
  username: string;
}

export const sign = (claims: JWTClaims): string => jwt.sign(claims, config.SECRET);

export const decode = (token: string): Promise<JWTClaims|null> => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) return resolve(null);
      return resolve(decoded);
    });
  })
}

// export const decode = (token: string): JWTClaims|null => {
//   return jwt.verify(token, config.SECRET);
// }
