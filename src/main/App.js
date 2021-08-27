import React from "react";
import "bootswatch/dist/flatly/bootstrap.css";
import "../custom.css";
import Rotas from "../main/Rotas";
import NavBar from "../components/NavBar";
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="container">
          <Rotas />
        </div>
      </>
    );
  }
}

export default App;
