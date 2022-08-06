

const UserItem = ({id, rndId, firstName, lastName, middleName, country, city, street, house, phone}) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{rndId}</td>
            <td>{firstName + " " + middleName + " " + lastName}</td>
            <td>{country+", "+city+", "+street+", " + house}</td>
            <td>{phone}</td>
        </tr>
    )
}

export default UserItem