import HomeAd from '../model/ads'
const  getAds =async ()=>{
    const url = `${_API_}/ads`
    const data = await fetch(url);
    const adsArray = await data.json();
    let ads=[];
    console.log(adsArray)
    adsArray.map((ad)=>{
        console.log(ad['Title']);
        const adNew=new HomeAd(ad['ID'],
            ad['Title'],
            ad['Description'],
            ad['City'],
            ad['Country'],
            [],
            ad['Price'],
            ad['PublishedDate'],
            ad['UserAdId'],
            ad['PropertyType'],
            ad['Rooms'],
            ad['Garages'],
            ad['RentByOwner'],
            ad['Furnished'],
            ad['Pets']
            );
        
        ads.push(adNew)
    });

            

    
  return ads
      
}

export {getAds}