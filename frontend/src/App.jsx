import React, { useState } from "react";
import "./App.css";

function App() {
    const [formData, setFormData] = useState({
        name: "",
        message: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formDataObj = new FormData();
            formDataObj.append('name', formData.name);
            formDataObj.append('message', formData.message);
            
            const response = await fetch('/api/quote', {
                method: 'POST',
                body: formDataObj,
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            
            setFormData({
                name: "",
                message: ""
            });
            
            console.log("Quote submitted successfully");
            
        } catch (err) {
            console.error("Failed to submit quote:", err);
        }
    };

    return (
        <div className="App">
            <h1>Hack at UCI Tech Deliverable</h1>
            <h2>Submit a quote</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="input-name">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="input-name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                />
                <label htmlFor="input-message">Quote</label>
                <input
                    type="text" 
                    name="message" 
                    id="input-message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required 
                />
                <button type="submit">Submit</button>
            </form>
            <h2>Previous Quotes</h2>
            <div className="messages">
                <p>Peter Anteater</p>
                <p>Zot Zot Zot!</p>
                <p>Every day</p>
            </div>
        </div>
    );
}

export default App;