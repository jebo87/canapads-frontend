import HomeAd from '../model/ads'
const getAd = async (id) => {
    const url = `${_API_}/ads/${id}`
    const data = await fetch(url);
    const ad = await data.json();
    const adNew = new HomeAd(
        ad['id'],
        ad['title'],
        ad['description'],
        ad['city'],
        ad['country'],
        ad['images'],
        ad['price'],
        ad['published'],
        ad['userad_id'],
        ad['rooms'],
        ad['propertyType'],
        ad['pets'],
        ad['furnished'],
        ad['garages'],
        ad['rentByOwner'],
        ad['last_updated'],
        ad['featured'],
        ad['lat'],
        ad['lon'],
        ad['bathrooms'],
        ad['view_count'],
        ad['street'],
        ad['postal_code'],
        ad['state_province'],
        ad['neighborhood'],
        ad['house_number'],
        ad['published_date'],
        ad['gym'],
        ad['pool'],
    );
    console.log(adNew)
    return adNew;

}
const getAds = async () => {
    const url = `${_API_}/ads`;
    console.log(localStorage.getItem("makako_token"));
    const data = await fetch(url, {
        mode: 'cors',
        headers: {
            'Access-Control-Request-Method': 'GET',
            'Access-Control-Request-Headers': 'Authorization',
            Authorization: 'Bearer ' + localStorage.getItem("makako_token")
        },
    });

    const adsArray = await data.json();
    let ads = [];
    console.log(adsArray);
    if (adsArray.message) {
        return {}
    }
    adsArray.ads.map((ad) => {
        const adNew = new HomeAd(
            ad['id'],
            ad['title'],
            ad['description'],
            ad['city'],
            ad['country'],
            ad['images'],
            ad['price'],
            ad['published'],
            ad['userad_id'],
            ad['rooms'],
            ad['propertyType'],
            ad['pets'],
            ad['furnished'],
            ad['garages'],
            ad['rentByOwner'],
            ad['last_updated'],
            ad['featured'],
            ad['lat'],
            ad['lon'],
            ad['bathrooms'],
            ad['view_count'],
            ad['street'],
            ad['postal_code'],
            ad['state_province'],
            ad['neighborhood'],
            ad['house_number'],
            ad['published_date'],
            ad['gym'],
            ad['pool'],
        );
        // console.log(adNew);
        ads.push(adNew)
    });
    const geoJson = convertToGeoJSON(ads);


    return geoJson

}

const convertToGeoJSON = (ads) => {
    let data = {

        "type": "FeatureCollection",
        "features": []
    }



    ads.map(ad => {
        let myAd = {
            "type": "Feature",
            "properties": {
                "id": ad['id'],
                "title": ad['title'],
                "description": ad['description'],
                "price": ad['price'],
                "image": ad['images'][0],
                "bedrooms": ad['rooms'],
                "neighborhood": ad['neighborhood']

            },
            "geometry": {
                "type": "Point",
                "coordinates": ad['coordinates']
            },

        }
        data.features.push(myAd)

    });
    return data

}

export { getAds, getAd }