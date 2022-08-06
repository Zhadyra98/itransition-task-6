const db = require('./DataBaseUtils');
const rand = require('./RandomGenerator');
const User = require('./User').User;



module.exports = function generateUserList(page, countryCode, errCoef, seed) {
    let size = 10;
    if (page == 1) size = 20;
    let users = [];

    rand.generator.initRnd(seed, page);
    const rng = rand.generator;

    for (let i = 0; i < size; i++) {
        
        let index = page == 1 ? i + 1 : 20 + (page - 2) * 10 + i + 1;
        let rndId = rng.getRand(10000000);
        let firstName = db.map.get(countryCode).firstNames[rng.getRand(100)];
        let lastName = db.map.get(countryCode).lastNames[rng.getRand(100)];
        let middleName = db.map.get(countryCode).middleNames[rng.getRand(100)];
        let country = db.map.get(countryCode).country
        let city = db.map.get(countryCode).cities[rng.getRand(100)];
        let street = db.map.get(countryCode).streets[rng.getRand(100)];
        let house = db.map.get(countryCode).house + " " + rng.getRand(1000);
        let phone = getRandPhoneNumber(rng, countryCode);

        const user = new User(
            index,
            rndId,
            firstName,
            lastName,
            middleName,
            country,
            city,
            street,
            house,
            phone
        );
        users.push(user);
    }

    let errSum = 0.0

    for (let i = 0; i < users.length; i++) {
        errSum += errCoef;
        if (errSum >= 1.0) {
            const errCount = parseInt(errSum);
            for (let j = 0; j < errCount; j++) {
                const fields = [
                    'firstName',
                    'lastName',
                    'middleName',
                    'country',
                    'city',
                    'street',
                    'house',
                    'phone'
                ];

                const randField = fields[rng.getRand(fields.length)];

                const errTypes = ["delete", "add", "swap"];
                const randError = errTypes[rng.getRand(errTypes.length)];
            

                const user = users[i];

                switch(randField) {
                    case 'firstName':
                        user.firstName = getFieldWithError(rng, user.firstName, randError, countryCode)
                        break;
                    case 'lastName':
                        user.lastName = getFieldWithError(rng, user.lastName, randError, countryCode)
                        break;
                    case 'middleName':
                        user.middleName = getFieldWithError(rng, user.middleName, randError, countryCode)
                        break;
                    case 'country':
                        user.country = getFieldWithError(rng, user.country, randError, countryCode)
                        break;
                    case 'city':
                        user.city = getFieldWithError(rng, user.city, randError, countryCode)
                        break;
                    case 'street':
                        user.street = getFieldWithError(rng, user.street, randError, countryCode)
                        break;
                    case 'house':
                        user.house = getFieldWithError(rng, user.house, randError, countryCode)
                        break;
                    case 'phone':
                        user.phone = getFieldWithError(rng, user.phone, randError, countryCode)
                        break;
                  }
            }

            errSum -= errCount;
        }
    }

    return users
}

function getFieldWithError(rng, field, randError, countryCode) {
    const randInd = rng.getRand(field.length);
    let errField = field;

    switch(randError) {
        case 'delete':
            if (field.length > 0) {
                errField = field.substring(0, randInd - 1) + field.substring(randInd, field.length);
            }
            break;
        case 'add':
            const alphabet = db.map.get(countryCode).alphabet;
            const randChar = alphabet[rng.getRand(alphabet.length)]
            errField = field.slice(0, randInd) + randChar + field.slice(randInd);
            break;
        case 'swap':
            if (field.length > 1) {
                if (randInd == field.length - 1) {
                    errField = swapStr(field, randInd, randInd - 1);
                } else {
                    errField = swapStr(field, randInd, randInd + 1);
                }
            }
            break;
    }

    return errField;
}

function swapStr(str, first, last){
    return str.substr(0, first)
           + str[last]
           + str.substring(first+1, last)
           + str[first]
           + str.substr(last+1);
}

function getRandPhoneNumber(rng, countryCode) {
    let phone1 = rng.getRand(1000);
    if (phone1 < 10) {
        phone1 = "0" + phone1;
    } else if (phone1 < 100) {
        phone1 = "0" + phone1;
    }

    let phone2 = rng.getRand(1000);
    if (phone2 < 10) {
        phone2 = "0" + phone2;
    } else if (phone2 < 100) {
        phone2 = "0" + phone2;
    }

    let phone3 = rng.getRand(1000);
    if (phone3 < 10) {
        phone3 = "0" + phone3;
    } else if (phone3 < 100) {
        phone3 = "0" + phone3;
    }

    let number = db.map.get(countryCode).phoneCode + "" + phone1 + "" + phone2 + "" + phone3

    return number
}