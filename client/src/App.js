import React, {useState, useEffect} from "react";
import UserTable from "./UserTable";
import Toolbar from "./Toolbar";

const App = () => {
    const [ countryCode, setCountryCode ] = useState("us");
    const [ users, setUsers ] = useState([]);
    const [ errCoef, setErrCoef ] = useState(0.0)
    const [ seed, setSeed ] = useState(1);
    const [ page, setPage ] = useState(1);

    useEffect(() => {
        if (page == 1) {
            initUsers();
        } else {
            loadUsers()
        }
        console.log("useEffect=>" + page + " " + countryCode + " " + seed);
    }, [page, countryCode, seed, errCoef]);

    const loadUsers = async() => {
        const req = await fetch(`http://localhost:5000/users?page=${page}&countryCode=${countryCode}&errCoef=${errCoef}&seed=${seed}`);
        const data = await req.json()
        if(data.status === 'ok'){ 
            setUsers(oldUsers => [...oldUsers, ...data.users]);
        }
    };

    const initUsers = async() => {
        const req = await fetch(`http://localhost:5000/users?page=1&countryCode=${countryCode}&errCoef=${errCoef}&seed=${seed}`);
        const data = await req.json()
        if(data.status === 'ok'){ 
            setUsers(data.users);
        }
    };

    const incrementPage = () => {
        setPage(page + 1)
    }

    const countryRefresh = (code) => {
        setPage(1)
        setCountryCode(code)
    }

    const seedRefresh = (seedNumber) => {
        setPage(1)
        setSeed(seedNumber);
    }

    const errorRefresh = (errorNumber) => {
        setPage(1)
        setErrCoef(errorNumber)
    }

    return (

        <div className="container">
            <Toolbar 
                countryCode = { countryCode } 
                countryRefresh = { countryRefresh } 
                seedRefresh = { seedRefresh }
                errorRefresh = { errorRefresh }
                errorCoef = {errCoef}
                users = {users}
                />
            <UserTable users = {users} incrementPage = {incrementPage}/>
        </div>
    )
}

export default App