// Indexpage.jsx

import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../helpers/styles/Index.css';
import { Usercontext } from "../Usercontext";

export default function Indexpage() {
    const { user } = useContext(Usercontext);
    const navigate = useNavigate();

    function nav(place) {
        if (user == null)
            alert('Please login to see more details');
        else
            navigate("/places/" + place._id);
    }

    const [places, setPlaces] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:4000/places/').then((res) => {
            setPlaces(res.data);
        });
    }, []);

    return (
        <div className="index-container">
            {places.length > 0 && places.map(place => (
                <div className="index-item" key={place._id} onClick={() => nav(place)}>
                    <div className="photo-container">
                        {place.addphotos?.[0] && (
                            <img src={'http://localhost:4000/uploads/' + place.addphotos[0]} alt="Place" />
                        )}
                    </div>
                    <div className="title">{place.title}</div>
                    <div className="price">${place.price}</div>
                </div>
            ))}
        </div>
    );
}
