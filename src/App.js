import React, { useState, useEffect } from "react";

import History from "./components/History";
import Search from "./components/Search";
import Footer from "./scenes/Footer";
import Header from "./scenes/Header";

const App = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const handleToggle = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="App">
      <Header handleToggle={handleToggle} showSearch={showSearch} />
      {showSearch ? (
        <Search
          searchHistory={searchHistory}
          setSearchHistory={setSearchHistory}
        />
      ) : (
        <History
          searchHistory={searchHistory}
          setSearchHistory={setSearchHistory}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;
