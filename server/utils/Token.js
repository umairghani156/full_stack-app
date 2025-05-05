import pkg from "jsonwebtoken";
import "dotenv/config";

const { sign } = pkg;


export const GenerateToken = ({ data, expiresIn }) => {
    return sign({ result: data }, process.env.JWT_SECRET_KEY, { expiresIn:expiresIn });
};