export default class Filter {
	constructor(obj) {
		this.city = obj.city;
		this.country = obj.country;
		this.price_low = obj.price_low;
		this.price_high = obj.price_high;
		this.published_date_low = obj.published_date_low;
		this.published_date_high = obj.published_date_high;
		this.rooms_low = obj.rooms_low;
		this.rooms_high = obj.rooms_high;
		this.property_type = obj.property_type;
		this.pets = obj.pets;
		this.furnished = obj.furnished;
		this.garages = obj.garages;
		this.rent_by_owner = obj.rent_by_owner;
		this.lat = obj.lat;
		this.lon = obj.lon;
		this.bathrooms = obj.bathrooms;
		this.postal_code = obj.postal_code;
		this.state_province = obj.state_province;
		this.neighborhood = obj.neighborhood;
		this.gym = obj.gym;
		this.pool = obj.pool;
		this.hasImages = obj.hasImages;
		this.from = obj.from;
		this.size = obj.size;
		this.searchParam = obj.searchParam;
		this.polygon = obj.polygon;
	}

	toJSON() {
		return {
			city: this.city,
			country: this.country,
			price_low: this.price_low,
			price_high: this.price_high,
			published_date_low: this.published_date_low,
			published_date_high: this.published_date_high,
			rooms_low: this.rooms_low,
			rooms_high: this.rooms_high,
			property_type: this.property_type,
			pets: this.pets,
			furnished: this.furnished,
			garages: this.garages,
			rent_by_owner: this.rent_by_owner,
			lat: this.lat,
			lon: this.lon,
			bathrooms: this.bathrooms,
			postal_code: this.postal_code,
			state_province: this.state_province,
			neighborhood: this.neighborhood,
			gym: this.gym,
			pool: this.pool,
			hasImages: this.hasImages,
			from: this.from,
			size: this.size,
			searchParam: this.searchParam,
			polygon: this.polygon
		};
	}
}
