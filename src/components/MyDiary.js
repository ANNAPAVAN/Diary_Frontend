import React, { useState, useEffect } from "react";
import axios from "axios";

function MyDiary() {
    const user = localStorage.getItem("diaryUser");
    const [formData, setFormData] = useState({
        userMail: user,
        diaryContent: "",
        favoriteIncident: "",
        mood: "",
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [diaryContentExceeded, setDiaryContentExceeded] = useState(false);
    const [favoriteIncidentExceeded, setFavoriteIncidentExceeded] = useState(false);

    useEffect(() => {
        const isDiaryContentExceeded = formData.diaryContent.length > 999;
        const isFavoriteIncidentExceeded = formData.favoriteIncident.length > 499;
        setDiaryContentExceeded(isDiaryContentExceeded);
        setFavoriteIncidentExceeded(isFavoriteIncidentExceeded);
        setIsButtonDisabled(isDiaryContentExceeded || isFavoriteIncidentExceeded);
    }, [formData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/adddiary`, formData);
            if(response.data.status === "submitted"){
                alert("Today Already Submitted");
                return;
            }
            if (response.data.status === 'success') {
                alert('Successfully added');
                setFormData({
                    userMail: user,
                    diaryContent: "",
                    favoriteIncident: "",
                    mood: "",
                });
            } else if (response.data.status === 'failure') {
                alert('Failed to add');
            }
        } catch (error) {
            alert('Failed to add');
        }
    };

    return (
        <div className="mydiary-container">
            <form onSubmit={handleSubmit} className="mydiary-form">
                <h1>My Diary</h1>
                <div className="mydiary-field">
                    <label htmlFor="diaryContent">Diary Content:</label>
                    <textarea id="diaryContent" name="diaryContent" value={formData.diaryContent} onChange={handleChange} />
                    {diaryContentExceeded && <p style={{ color: "red" }}>Diary content exceeded maximum length (999 characters)</p>}
                </div>
                <div className="mydiary-field">
                    <label htmlFor="favoriteIncident">Favorite Incident:</label>
                    <input type="text" id="favoriteIncident" name="favoriteIncident" value={formData.favoriteIncident} onChange={handleChange} />
                    {favoriteIncidentExceeded && <p style={{ color: "red" }}>Favorite incident exceeded maximum length</p>}
                </div>
                <div className="mydiary-field">
                    <label>Mood:</label>
                    <div className="mydiary-radio-group">
                        <label>
                            <input type="radio" name="mood" value="happy" checked={formData.mood === "happy"} onChange={handleChange} /> Happy
                        </label>
                        <label>
                            <input type="radio" name="mood" value="sad" checked={formData.mood === "sad"} onChange={handleChange} /> Sad
                        </label>
                        <label>
                            <input type="radio" name="mood" value="normal" checked={formData.mood === "normal"} onChange={handleChange} /> Normal
                        </label>
                    </div>
                </div>
                <div className="mydiary-field">
                    <button type="submit" className="mydiary-submit-btn" disabled={isButtonDisabled}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default MyDiary; 
