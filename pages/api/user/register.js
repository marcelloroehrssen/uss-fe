export default async (req, res) => {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.TLS_REJECT_UNAUTHORIZED;

    const registerReq = fetch(process.env.BACKEND_URL + 'register_json', {
        headers: {
            "Content-Type": "application/json"
        },
        method: "post",
        body: req.body
    })
        .then(r => r.json())
    ;

    const register = await registerReq

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(register)
}