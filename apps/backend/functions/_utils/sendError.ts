import { Response } from "express";

export default (res: Response, statusCode: number, msg: string) => {
	return res.status(statusCode).send({ error: msg });
};
