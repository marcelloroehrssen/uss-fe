import {Connector} from "../../../src/connector";

export default async (req, res) => {

    const inventory = await Connector(req, res, 'inventory')

    res.statusCode = inventory === null ? 400 : 200;
    res.setHeader('Content-Type', 'application/json')
    res.json(inventory)
}