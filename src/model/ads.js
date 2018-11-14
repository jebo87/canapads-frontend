export class BaseAd {

    constructor(
        id,
        title,
        description,
        city,
        country,
        images,
        price,
        published,
        user) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.city = city;
        this.country = country;
        this.images = images;
        this.price = price;
        this.user = user;
        this.published = published;

    }

}

export default class HomeAd extends BaseAd {

    // contructor for an add with all details, for deatil page.
    constructor(
        id,
        title,
        description,
        city,
        country,
        images,
        price,
        published,
        user,
        rooms,
        type,
        pets,
        furnished,
        garages,
        rentOwner,
        last_updated,
        featured,
        lat,
        lon,
        bathrooms,
        view_count,
        street,
        postal_code,
        state_province,
        neighborhood,
        house_number,
        published_date,
        pool,
        gym
    ) {
        super( id,
            title,
            description,
            city,
            country,
            images,
            price,
            published,
            user);
        this.type = type;
        this.rooms = rooms;
        this.garages = garages;
        this.rentOwner = rentOwner;
        this.pets = pets;
        this.furnished = furnished;
        this.garages = garages;
        this.rentOwner = rentOwner;
        this.last_updated = last_updated;
        this.featured = featured;
        this.lat = lat;
        this.lon = lon;
        this.coordinates = [lon,lat];
        this.bathrooms = bathrooms;
        this.view_count = view_count;
        this.street = street;
        this.postal_code = postal_code;
        this.state_province = state_province;
        this.neighborhood = neighborhood;
        this.house_number = house_number;
        this.published_date = published_date;
        this.pool = pool;
        this.gym = gym;
    }

    toJSON() {
        return {
            id: id,
            title: this.title,
            description: this.description,
            images: this.images,
            price: this.price,
            published: this.published,
            user: this.user,
            city: this.city,
            country: this.country,
            type: this.type,
            rooms: this.rooms,
            garages: this.garages,
            rentOwner: this.rentOwner,
            furnished: this.furnished,
            pets: this.pets
        };
    }


}
