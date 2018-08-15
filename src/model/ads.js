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
        type,
        rooms,
        garages,
        rentOwner,
        furnished,
        pets) {
        super(id, title, description, city, country, images, price, published, user);
        type = type;
        rooms = rooms;
        garages = garages;
        rentOwner = rentOwner;
        furnished = furnished;
        pets = pets;
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
