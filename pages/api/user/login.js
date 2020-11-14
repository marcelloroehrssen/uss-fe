export default async (req, res) => {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.TLS_REJECT_UNAUTHORIZED;

    const loginReq = fetch(process.env.BACKEND_URL + 'login_json', {
        headers: {
            "Content-Type": "application/json"
        },
        method: "post",
        body: req.body
    })
        .then(r => r.headers)
        .then(h => {
            if (h.has('Set-Cookie')) {
                return {
                    data: h.get('Set-Cookie').split('; ')[0].replace('USS=', ''),
                    message: 'Login riuscito'
                }
            }
            return {
                data: null,
                message: 'Login fallito'
            }
        })
    ;

    const login = await loginReq

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(login)
}