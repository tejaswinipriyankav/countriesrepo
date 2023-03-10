import axios from "axios";
import { useEffect, useState } from "react";
import img from "./home.jpeg";

export default function Countries() {
    const [data, setData] = useState([]);
    const [search, setsearch] = useState("");
    const [country, setcountry] = useState();
    const [countrySelected, setCountrySelected] = useState(false);
    const [continents, setContinents] = useState('select the country');
    const [image, setImage]= useState(true);
    useEffect(() => {
        if (continents !== "select the country") {
            axios.get(`https://restcountries.com/v2/region/${continents}`)
                .then(response => setData(response.data))
        }

    }, [continents]);
    const test = async (event) => {
        setContinents(event.target.value);
        setCountrySelected(false);
        if(event.target.value === "select the country"){
            setImage(true);
        }
        else{
            setImage(false);
        }
    }

    function onchangeHandler(event) {
        // console.log(event.target.value);
        setsearch(event.target.value);
    }
    function onclickHandler() {
        setcountry(search);
        // console.log(search);
        setCountrySelected(true);
        setsearch("");
    }


    return (

        <div >
            <div>
            <div className="dropbtn">
                <ul className="nav justify-content-center">
                    <select 
                    value={continents} onChange={test} className="select">
                        <option >select the country</option>
                        <option >asia</option>
                        <option >africa</option>
                        <option >europe</option>
                        <option>americas</option>
                    </select>
                    
                    <input className="searchCountry"
                        type="text"
                        placeholder="Search Country"
                        value={search}
                        onChange={onchangeHandler}
                    />
                    <button type="submit" onClick={onclickHandler} className="search">Search</button>
                </ul>
                {image && <img className="homeimg" alt="description" src={img} ></img>}
            </div>
            </div>
            <div>

                {
                    continents !== "select the country" ?
                        <table>
                            <thead>
                                <tr>
                                    <th>Country</th>
                                    <th>Capital</th>
                                    <th>Population</th>
                                    <th>Flag</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (countrySelected ? data && data.map((item, index) => {
                                        if (item.name === country) {
                                            return (

                                                <tr>
                                                    <td>{item.name}</td>
                                                    <td>{item.capital}</td>
                                                    <td>{item.population}</td>
                                                    <td><img src={item.flag} alt="Hello" width="50px" /></td>

                                                </tr>



                                            )
                                        }
                                        return null;
                                    })
                                        :

                                        data && data.map((item, index) => {

                                            return (
                                                <tr key={index} >
                                                    <td >{item.name}</td>
                                                    <td >{item.capital}</td>
                                                    <td >{item.population}</td>
                                                    <td><img src={item.flag} alt="Hello" width="100px" /></td>
                                                </tr>
                                            )

                                        })




                                    )
                                }
                            </tbody>
                        </table>

                        :
                        <div className="header">
                            <h1>
                                Welcome
                            </h1>
                        </div>

                }


            </div>
        </div>
    );
}

