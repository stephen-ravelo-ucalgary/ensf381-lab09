import "./HousePricePredictor.css";
import React, { useState } from "react";

function HousePricePredictor() {
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [lease_term, setLeaseTerm] = useState("");
    const [type, setType] = useState("");
    const [beds, setBeds] = useState("");
    const [baths, setBaths] = useState("");
    const [sq_feet, setSquareFeet] = useState("");
    const [furnishing, setFurnishing] = useState("");
    const [smoking, setSmoking] = useState("");
    const [pets, setPets] = useState("");

    const [showPrice, setShowPrice] = useState(false);
    const [price, setPrice] = useState(null);

    async function handleSubmit(event) {
        setPrice(null);
        setShowPrice(true);

        event.preventDefault();
        
        const backendEndpoint = "http://127.0.0.1:5000/predict_house_price";
        try {
            const response = await fetch(backendEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    'city': city,
                    'province': province,
                    'latitude': latitude,
                    'longitude': longitude,
                    'lease_term': lease_term,
                    'type': type,
                    'beds': beds,
                    'baths': baths,
                    'sq_feet': sq_feet,
                    'furnishing': furnishing,
                    'smoking': smoking,
                    'pets': pets,
                }), //Converts a JavaScript object or value into a JSON string.
            });


            //const data = await response.text();
            const data = await response.json();

            if (response.ok) {
                setPrice(data['predicted_price']);
            } else {
                console.error("Form submission failed.");
            }
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    }

    return (
        <div className="HousePricePredictor">
            <form onSubmit={handleSubmit} className="HousePricePredictor-form">
                <h2>House Price Predictor</h2>
                <label for="city">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <label for="province">Province:</label>
                <input
                    type="text"
                    id="province"
                    name="province"
                    onChange={(e) => setProvince(e.target.value)}
                    required
                />
                <label for="latitude">Latitude:</label>
                <input
                    type="text"
                    id="latitude"
                    name="latitude"
                    onChange={(e) => setLatitude(e.target.value)}
                    required
                />
                <label for="longitude">Longitude:</label>
                <input
                    type="text"
                    id="longitude"
                    name="longitude"
                    onChange={(e) => setLongitude(e.target.value)}
                    required
                />
                <label for="lease_term">Lease Term:</label>
                <input
                    type="text"
                    id="lease_term"
                    name="lease_term"
                    onChange={(e) => setLeaseTerm(e.target.value)}
                    required
                />
                <label for="type">Type of House:</label>
                <input
                    type="text"
                    id="type"
                    name="type"
                    onChange={(e) => setType(e.target.value)}
                    required
                />
                <label for="beds">Beds:</label>
                <input
                    type="text"
                    id="beds"
                    name="beds"
                    onChange={(e) => setBeds(e.target.value)}
                    required
                />
                <label for="baths">Baths:</label>
                <input
                    type="text"
                    id="baths"
                    name="baths"
                    onChange={(e) => setBaths(e.target.value)}
                    required
                />
                <label for="sq_feet">Square Feet:</label>
                <input
                    type="text"
                    id="sq_feet"
                    name="sq_feet"
                    onChange={(e) => setSquareFeet(e.target.value)}
                    required
                />
                <label for="furnishing">Furnishing:</label>
                <select
                    id="furnishing"
                    name="furnishing"
                    onChange={(e) => setFurnishing(e.target.value)}
                    required
                >
                    <option value="unfurnished">Unfurnished</option>
                    <option value="partiallyFurnished">Partially Furnished</option>
                    <option value="fullyFurnished">Fully Furnished</option>
                </select>
                <label for="smoking">Smoking:</label>
                <input
                    type="text"
                    id="smoking"
                    name="smoking"
                    onChange={(e) => setSmoking(e.target.value)}
                    required
                />
                <label for="pets">I have a pet:</label>
                <input
                    type="checkbox"
                    id="pets"
                    name="pets"
                    onChange={(e) => setPets(e.target.value)}
                />
                <button type="submit">Predict</button>
                {showPrice ? (
                    price ? (
                        <p className="price">Predicted Rent Price: ${price.toFixed(2)}</p>                        
                    ) : (
                        <p className="price">Loading...</p>                        
                    )
                ) : (
                    null
                    )
                }
            </form>
        </div>
    );
}

export default HousePricePredictor;
