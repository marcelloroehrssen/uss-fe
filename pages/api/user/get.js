import {Connector} from "../../../src/connector";

export default async (req, res) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.TLS_REJECT_UNAUTHORIZED;

    const user = await Connector(req, res, 'user')

    res.statusCode = user === null ? 400 : 200;
    res.setHeader('Content-Type', 'application/json')
    res.json(user)
}