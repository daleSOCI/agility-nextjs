export async function getContentList(agility, referenceName, languageCode) {
    let contentList = null;
    const api = agility;
    let contentListRes = await api.getContentList({
        referenceName,
        languageCode,
        depth: 10,
        expandAllContentLinks: true,
        take: 50
    });
    contentListRes.items.sort((a, b) => (a.properties.itemOrder > b.properties.itemOrder) ? 1 : -1);
    contentList = contentListRes.items.map(item => item.fields);
    return {
        contentList
    }
}