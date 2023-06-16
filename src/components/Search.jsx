import React, { useState } from "react";

const Search = ({ searchHistory, setSearchHistory }) => {
  const [word, setWord] = useState("");
  const [val, setVal] = useState("");
  const [searched, setSearched] = useState(false);
  const [showError, setShowError] = useState(false);
  const URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

  const handleChange = (e) => {
    setWord(e.target.value);
  };

  const handleSubmit = (e) => {
    const fetchWord = async () => {
      const result = await fetch(`${URL}/${word}`);
      if (result.status === 200) {
        const json = await result.json();
        if (json && Array.isArray(json) && json.length > 0) {
          const { word, meanings } = json[0];
          if (
            word &&
            meanings &&
            Array.isArray(meanings) &&
            meanings.length > 0
          ) {
            const definition = meanings[0]?.definitions[0]?.definition;
            if (definition) {
              setVal(json);
              setSearched(true);
              console.log(json);
              const entry = { word, meaning: definition }; // Define the entry object
              const updatedHistory = [entry, ...searchHistory]; // Update the search history array
              setSearchHistory(updatedHistory);
              localStorage.setItem(
                "searchHistory",
                JSON.stringify(updatedHistory)
              );
            } else {
              setSearched(false);
              setShowError(true);
            }
          } else {
            setSearched(false);
            setShowError(true);
          }
        } else {
          setSearched(false);
          setShowError(true);
        }
      } else {
        setSearched(false);
        setShowError(true);
      }
    };
    fetchWord();
  };

  return (
    <div>
      <div className="p-2 min-h-[80vh]">
        <div className="wrpr">
          <div className="search text-center mt-[30px]">
            <p className="font-bold text-3xl mb-[20px]">Search for new word</p>
            <div id="input">
              <input
                className="text-xl rounded-md p-[5px] min-w-[60%] text-deep-blue"
                id="input-Word"
                type="text"
                onChange={handleChange}
                value={word}
              />
              <i
                id="btn2"
                className="fa-solid fa-magnifying-glass bg-red p-[11px] hover:bg-yellow transition cursor-pointer ml-2 rounded-full"
                onClick={handleSubmit}
              ></i>
            </div>
          </div>
          <div
            id="card"
            className="text-center bg-red min-h-[60vh] m-[8px] rounded-lg"
          >
            {searched ? (
              <div className="p-3 font-bold font-poppins text-deep-blue">
                <div className="text-xl">
                  Word :
                  <span>
                    {val.map((j, index) => (
                      <span key={index}>{j.word}</span>
                    ))}
                  </span>
                </div>
                <div id="details">
                  {val?.map((j, index) => (
                    <div key={index}>
                      <div>Part Of Speech: {j.meanings[0].partOfSpeech}</div>
                      <div className="text-xl">
                        Definition: {j.meanings[0].definitions[0].definition}
                      </div>
                      <div>
                        {j.meanings[0].synonyms.map((s, i) => (
                          <div key={i}>
                            Synonym {i + 1}: {s}
                          </div>
                        ))}
                      </div>
                      <div>
                        {j.meanings[0].antonyms.map((s, i) => (
                          <div key={i}>
                            Antonyms {i + 1}: {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : showError ? (
              <div className="text-xl font-geologica font-bold pt-[20px]">
                No Such Word Found
              </div>
            ) : (
              <div className="text-xl font-geologica font-bold pt-[20px]">
                Search Your First Word
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
