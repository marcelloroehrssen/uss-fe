export default async (req, res) => {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.TLS_REJECT_UNAUTHORIZED;

    delete req.headers.host;

    const emailReq = fetch(process.env.BACKEND_URL + 'user/email',{
        method: 'post',
        body: req.body
    }).then(r =>  r.json());

    const email = await emailReq;

    res.statusCode = email === null ? 400 : 200;
    res.setHeader('Content-Type', 'application/json')
    res.json(email)
}