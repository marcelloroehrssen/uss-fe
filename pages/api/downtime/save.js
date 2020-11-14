import {Saver} from "../../../src/connector";

export default async (req, res) => {

    const downtime = await Saver(req, res, 'downtime')

    res.statusCode = downtime === null ? 400 : 200;
    res.setHeader('Content-Type', 'application/json')
    res.json(downtime)
}
