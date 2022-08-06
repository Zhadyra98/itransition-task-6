class User {
    constructor(index, rndId, firstName, lastName, middleName, country, city, street, house, phone) {
        this.index = index,
        this.rndId = rndId,
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.country = country;
        this.city = city;
        this.street = street;
        this.house = house;
        this.phone = phone;
    }
}


exports.User = User