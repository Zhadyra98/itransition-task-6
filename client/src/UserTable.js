import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";

const UserTable = ({users, incrementPage}) => {
    const handleScroll = (e) => {
        if(window.innerHeight + e.target.documentElement.scrollTop + 1 >= 
            e.target.documentElement.scrollHeight ) {
                incrementPage();
            }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    } , [users]);

    return (
        <div className="d-flex justify-content-center mt-5"> 
            <table className = "table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>RandomID</th>
                        <th>Full name</th>
                        <th>Address</th>
                        <th>Phone number</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item) => (
                        <UserItem 
                        key = {item.index}
                        id = {item.index}
                        rndId = {item.rndId}
                        firstName = {item.firstName}
                        lastName = {item.lastName}
                        middleName = {item.middleName}
                        country = {item.country}
                        city = {item.city}
                        street = {item.street}
                        house = {item.house}
                        phone = {item.phone}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserTable