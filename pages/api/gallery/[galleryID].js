import agility from '@agility/content-fetch';
const api = agility.getApi({
    guid: process.env.AGILITY_GUID,
    apiKey: process.env.AGILITY_API_FETCH_KEY,
    isPreview: false
});

export default async function handler(req, res) {
    const { galleryID } = req.query;
    let gallery = null;
    try {
        let galleryRes = await api.getGallery({
            galleryID,
        });
        gallery = galleryRes.media;
    } catch (err) {
        console.log('Gallery request error: ', err);
    }
    res.status(200).send({ gallery })
}