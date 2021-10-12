import agility from '@agility/content-fetch';
const api = agility.getApi({
    guid: process.env.AGILITY_GUID,
    apiKey: process.env.AGILITY_API_FETCH_KEY,
    isPreview: false
});

export default async function handler(req, res) {
    const referenceName = req.query.ref;
    let content = null;
    try {
        let contentRes = await api.getContentList({
            referenceName,
            languageCode: 'en-us',
            contentLinkDepth: 10,
            take: 3,
            sort: 'fields.date',
            direction: 'desc'
        });
        content = contentRes;
    } catch (err) {
        console.log('Content request error: ', err);
    }
    res.status(200).send({ content })
}