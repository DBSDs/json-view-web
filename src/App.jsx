
import React from "react";

import Header from './components/Header'
import InputContent from './components/InputContent'
import OutputContent from "./components/OutputContent";
import "./index.scss";
import "./font/iconfont.css"

const App = () => {
  return (
    <div>
      <Header />
      <div className="content">
        <InputContent />
        <OutputContent />
      </div>
    </div>
  );
}

export default App