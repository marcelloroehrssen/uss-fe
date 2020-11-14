import {Saver} from "../../../src/connector";

export default async (req, res) => {

    const character = await Saver(req, res, 'character');

    res.statusCode = character === null ? 400 : 200;
    res.setHeader('Content-Type', 'application/json')
    res.json(character)
}
