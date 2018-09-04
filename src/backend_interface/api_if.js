import HomeAd from '../model/ads'
const  getAds =async ()=>{
    const url = `${_API_}/ads`
    const data = await fetch(url);
    const adsArray = await data.json();
    let ads=[];
    console.log(adsArray.ads)
    adsArray.ads.map((ad)=>{
        console.log(ad['title']);
        const adNew=new HomeAd(
            ad['id'],
            ad['title'],
            ad['description'],
            ad['city'],
            ad['country'],
            ad['images'],
            ad['price'],
            ad['publishedDate'],
            ad['userAdId'],
            ad['propertyType'],
            ad['rooms'],
            ad['garages'],
            ad['rentByOwner'],
            ad['furnished'],
            ad['pets']
            );
        
        ads.push(adNew)
    });

            

    
  return ads
      
}

export {getAds}