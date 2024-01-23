import React from "react";
import "./test.scss";
import AddressSearch from "../components/BanField/banfield";

const TestPage = () => {
  return (
    <div className="mainPage">
      <header className="mainPage-header">
        <h1>Entre ton addresse pour avoir la note</h1>
      </header>

      <section className="mainPage-content">
        <div className="inputs-field">
          {/* Include AddressSearch component here */}
          <AddressSearch />
        </div>
      </section>
    </div>
  );
};

export default TestPage;
