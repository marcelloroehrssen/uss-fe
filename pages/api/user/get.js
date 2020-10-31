export default async (req, res) => {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    if (!req.headers.cookie) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(null);
        return;
    }

    delete req.headers.host;

    const cookie = req.headers.cookie.replace('token', 'USS');
    const userReq = fetch('http://localhost:8000/user',{
        headers: {...req.headers, cookie}
    }).then(r =>  r.json());


    const user = await userReq;

    res.statusCode = user === null ? 400 : 200;
    res.setHeader('Content-Type', 'application/json')
    res.json(user)
}