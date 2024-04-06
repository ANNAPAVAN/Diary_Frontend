import React, { useState, useEffect } from "react";
import axios from "axios";

function DiaryEntries({ email }) {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("diaryUser");
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/auth/getdiary/${email}`);
        setDiaryEntries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email]);

  const filteredEntries = diaryEntries.filter(diary => {
    return diary.ddate.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="outer-body">
    <div className="diary-entries-container">
      <h2>Diary Entries</h2>
      <input
        type="date"
        placeholder="Search date"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="diary-entries-search-bar"
      />
      <ul className="diary-entries-list">
        {filteredEntries.map((entry, index) => (
          <li key={index} className="diary-entry">
            <strong>Diary:</strong> {entry.diary}<br />
            <strong>Favorite Incident:</strong> {entry.fav}<br />
            <strong>Mood:</strong> {entry.mood}<br />
            <strong>Date:</strong> {entry.ddate.slice(0, 10)}<br />
            <hr className="diary-entry-divider" />
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default DiaryEntries;
