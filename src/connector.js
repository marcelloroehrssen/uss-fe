export const Connector = async (req, res, entity) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.TLS_REJECT_UNAUTHORIZED;

    if (!req.headers.cookie) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(null);
        return;
    }

    delete req.headers.host;

    const cookie = req.headers.cookie.replace('token', 'USS');
    const remoteReq = fetch(process.env.BACKEND_URL + entity, {
        headers: {...req.headers, cookie}
    }).then(r => r.json());

    return await remoteReq;
}

export const Saver = async (req, res, resource) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.TLS_REJECT_UNAUTHORIZED;

    if (!req.headers.cookie) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(null);
        return;
    }

    delete req.headers.host;

    const cookie = req.headers.cookie.replace('token', 'USS');
    const remoteReq = fetch(process.env.BACKEND_URL + resource,{
        method: 'post',
        headers: {...req.headers, cookie},
        body: req.body
    }).then(r =>  r.json());

    return await remoteReq;
}