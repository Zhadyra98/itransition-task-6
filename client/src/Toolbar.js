import React, {useState, useMemo, useEffect } from "react"
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import Slider from '@mui/material/Slider'
import debouce from "lodash.debounce";
import { CSVLink, CSVDownload } from "react-csv";
import json2csv from "json2csv";
import {MdFileDownload} from 'react-icons/md'

const Toolbar = ({ countryCode, countryRefresh, seedRefresh, errorRefresh, errorCoef, users }) => {

    const handleChangeCountry = (code) => {
        countryRefresh(code);
    }

    const onErrorCoefHandle = (e) => {
        const errCoef = e.target.value
        errorRefresh(errCoef == "" ? 0.0 : parseFloat(errCoef));
    }

    const errorCoefDebounced = useMemo(() => {
        return debouce(onErrorCoefHandle, 100);
    }, []);

    const onSliderChange = (e) => {
        const element = document.querySelector("#errorCoefInput")

        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(element, e.target.value);
        
        var event = new Event('input', { bubbles: true});
        element.dispatchEvent(event);
    }

    const onSeedHandle = (e) => {
        const seed = e.target.value;
        seedRefresh(seed == "" ? 1 : parseInt(seed));
    }

    const seedDebounced = useMemo(() => {
        return debouce(onSeedHandle, 0);
    }, []);

    const onSeedGenerate = () => {
        const randomSeed = getRandomInt(10000);
        const element = document.querySelector("#seedInput")

        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(element, randomSeed);
        
        var event = new Event('input', { bubbles: true});
        element.dispatchEvent(event);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    
    useEffect(() => {
        return () => {
            seedDebounced.cancel();
            errorCoefDebounced.cancel();
        };
    });

    const headers = [
        { label: "#", key: "index" },
        { label: "RandomID", key: "rndId" },
        { label: "First Name", key: "firstName" },
        { label: "Last Name", key: "lastName" },
        { label: "Middle Name", key: "middleName" },
        { label: "Country", key: "country" },
        { label: "City", key: "city" },
        { label: "Street", key: "street" },
        { label: "House", key: "house" },
        { label: "Phone", key: "phone" }
    ];

    return(
        <div className="mt-5 row g-3">
            <div className = "col-auto">
            <h6>Select country</h6>
                <Dropdown as={ButtonGroup}>
                    <Button
                    style={{width: "160px"}}
                    className="text-capitalize text-start"
                    variant="primary"
                    >
                    {countryCode == "us" ? 'United States' : countryCode == "ru" ? 'Россия' : 'España' }
                    </Button>
                    <Dropdown.Toggle
                    split
                    variant="primary"
                    id="dropdown-split-basic"
                    />
                    <Dropdown.Menu>
                    <Dropdown.Item eventKey="1" onClick={() => handleChangeCountry("us")}>
                        United States
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => handleChangeCountry("ru")}>
                        Россия
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={() => handleChangeCountry("es")}>
                        España
                    </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="col-auto mx-5">
                <h6>Error per record (∞)</h6>
                <Slider  
                    id="sliderItem" 
                    className="col-auto"
                    aria-label="Always visible"
                    defaultValue={1.3}
                    value={parseFloat(errorCoef)}
                    max={10}
                    min={0}
                    step={0.5}
                    marks={true}
                    onChange={onSliderChange} 
                />
                <input id="errorCoefInput" type="text" className="form-control" placeholder="Error Number" defaultValue={0} onChange={errorCoefDebounced}></input>
            </div>
            <div className="col-auto">
                <h6>Seed number (∞)</h6>
                <input id="seedInput" type="text" className="form-control" placeholder="Seed" defaultValue={1} onChange={seedDebounced}></input>
                <button type="submit" className="btn btn-primary mt-2" onClick={onSeedGenerate}>Random</button>
            </div>
            <div className="col-auto my-auto  mx-5">
                <CSVLink 
                    data={users} 
                    headers={headers} 
                    filename={"users.csv"}
                    className="btn btn-success"
                    target="_blank">
                    <span className="mr-3">Download Table </span>
                    <MdFileDownload />
                </CSVLink>
            </div>
        </div>
    )
}

export default Toolbar