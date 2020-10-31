export default (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(
        {
            mode: 0,
            name: '',
            faith: null,
            faction: null,
            attributes: {
                physical: 1,
                mental: 1,
                social: 1,
            },
            defects: {
                mode: -1 ,
                list: []
            },
            job: null,
            jobSkills: [],
            factionSkills: null,
            skills: [],
            discardedSkill: null,
            backgrounds: {}
        }
    ))
}
