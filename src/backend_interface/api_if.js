import HomeAd from '../model/ads'
const getAds = async () => {
    const url = `${_API_}/ads`
    const data = await fetch(url);
    const adsArray = await data.json();
    let ads = [];
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
        );

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
                "title": ad['title']

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

export { getAds }