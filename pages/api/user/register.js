export default async (req, res) => {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    console.log(req.body);

    const registerReq = fetch('https://localhost:8000/register_json', {
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