import React from "react";
import "bootswatch/dist/flatly/bootstrap.css";
import "../custom.css";
import Rotas from "../main/Rotas";
import NavBar from "../components/NavBar";
import "toastr/build/toastr.css";
import "toastr/build/toastr.min.js";
import ProvedorAutenticacao from "./ProvedorAutenticacao";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
class App extends React.Component {
  render() {
    return (
      <ProvedorAutenticacao>
        <NavBar />
        <div className="container">
          <Rotas />
        </div>
      </ProvedorAutenticacao>
    );
  }
}

export default App;
