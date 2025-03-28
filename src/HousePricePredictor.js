import React, {useState} from 'react';
import "./HousePricePrediction.css";

function HousePricePredictor() {
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [lease_term, setLeaseTerm] = useState("");
    const [type, setType] = useState("");
    const [beds, setBeds] = useState("");
    const [baths, setBaths] = useState("");
    const [sq_feet, setSquareFeet] = useState("");
    const [furnishing, setFurnishing] = useState("");
    const [smoking, setSmoking] = useState("");
    const [pets, setPets] = useState("");
    const [price, setPrice] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        
        const backendEndpoint = "http://127.0.0.1:5000/predict_house_price";
        try {
            const response = await fetch (backendEndpoint , {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({"city" : city, 
                    "province" : province,
                    "longitutde" : longitude,
                    "latitude" : latitude,
                    "lease_term" : lease_term,
                    "type" : type,
                    "beds" : beds,
                    "baths": baths,
                    "sq_feet" : sq_feet,
                    "furnishing" : furnishing,
                    "smoking" : smoking,
                    "pets": pets
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setPrice(data["predicted_price"]);
            } else {

            }
        }
        catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <div className="hpp">
            {/* <form className="hpp" onSubmit={handleSubmit}> */}
            <form className="hpp">
                <h2>House Price Predictor</h2>

                <label for="city">City:</label>
                <input type="text" id="city" name="city" onChange={(e) => setCity(e.target.value)} required></input>
                
                <label for="province">Province:</label>
                <input type="text" id="province" name="province" onChange={(e) => setProvince(e.target.value)} required></input>
                
                <label for="latitude">Latitude:</label>
                <input type="text" id="latitude" name="latitude" onChange={(e) => setLatitude(e.target.value)} required></input>
                
                <label for="longitude">Longitude:</label>    
                <input type="text" id="longitude" name="longitude" onChange={(e) => setLongitude(e.target.value)} required></input>
            
                <label for="leaseterm">Lease Term:</label>
                <input type="text" id="leaseterm" name="leaseterm" onChange={(e) => setLeaseTerm(e.target.value)} required></input>
                
                <label for="type">Type:</label>
                <input type="text" id="type" name="type" onChange={(e) => setType(e.target.value)} required></input>
                
                <label for="beds">Beds:</label>
                <input type="text" id="beds" name="beds" onChange={(e) => setBeds(e.target.value)} required></input>

                <label for="baths">Baths:</label>
                <input type="text" id="baths" name="baths" onChange={(e) => setBaths(e.target.value)} required></input>
                
                <label for="squarefeet">Square Feet:</label>
                <input type="text" id="squarefeet" name="squarefeet" onChange={(e) => setSquareFeet(e.target.value)} required></input>
                
                <label for="furnishing">Furnishing:</label>
                <select id="furnishing" name="furnishing" onChange={(e) => setFurnishing(e.target.value)} required>
                    <option value="unfurnished">Unfurnished</option>
                    <option value="partiallyfurnished">Partially Furnished</option>
                    <option value="fullyfurnished">Fully Furnished</option>
                </select>
                
                <label for="smoking">Smoking:</label>    
                <input type="text" id="smoking" name="smoking" onChange={(e) => setSmoking(e.target.value)} required></input>
                <br></br>
                <label for="pet">I have a pet:</label>
                <input type="checkbox" id="pet" name="pet" onChange={(e) => setPets(e.target.value)} required></input>

                <button type="submit">Predict</button>
                {price ? <p></p> : null}
            </form>
        </div>
    );
}

export default HousePricePredictor;
