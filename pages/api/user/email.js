export default async (req, res) => {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    delete req.headers.host;

    const emailReq = fetch('http://localhost:8000/user/email',{
        method: 'post',
        body: req.body
    }).then(r =>  r.json());

    const email = await emailReq;

    res.statusCode = email === null ? 400 : 200;
    res.setHeader('Content-Type', 'application/json')
    res.json(email)
}