import React, { useState, useEffect } from "react";

const History = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Load search history from local storage on component mount
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const handleDelete = (word) => {
    // Remove the word from search history and update local storage
    const updatedHistory = searchHistory.filter((entry) => entry.word !== word);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div>
      <div className="history-wrpr m-4 bg-red min-h-[60vh] rounded-lg p-[10px]">
        <h2 className="text-center font-geologica font-bold text-[24px]">
          Search History
        </h2>
        {searchHistory.length > 0 ? (
          <ul className="flex align-middle justify-center gap-[8px] flex-wrap">
            {searchHistory.map((entry) => (
              <li
                className="bg-grey p-[10px] rounded-[8px] text-black min-w-[400px]"
                key={entry.word}
              >
                <div>
                  <strong>Word:</strong> {entry.word}
                </div>
                <div>
                  <strong>Meaning:</strong> {entry.meaning}
                </div>
                <button
                  className="font-bold text-red"
                  onClick={() => handleDelete(entry.word)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center font-poppins font-medium text-[18px] mt-[30px]">
            No search history found.
          </p>
        )}
      </div>
    </div>
  );
};

export default History;
