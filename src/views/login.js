import React, { Component } from "react";
import Card from "../components/Card";
import FormGroup from "../components/FormGroup";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../main/ProvedorAutenticacao";

import UsuarioService from "../app/service/UsuarioService";
import LocalStorageService from "../app/service/LocalStorageService";
import { mensagemErro } from "../components/Toastr";

class Login extends React.Component {
  state = {
    email: "",
    senha: "",
    mensagemErro: null,
  };

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  entrar = () => {
    this.service
      .autenticar({
        email: this.state.email,
        senha: this.state.senha,
      })
      .then((response) => {
        LocalStorageService.adicionarItem("_usuario_logado", response.data);
        this.context.iniciarSessao(response.data)
        this.props.history.push("/home");
      })
      .catch((erro) => {
        mensagemErro(erro.response.data);
      });
  };

  prepareCadastrar = () => {
    this.props.history.push("/cadastro-usuarios");
  };

  render() {
    return (
      <div className="row">
        <div
          className="col-md-6"
          style={{ position: "relative", left: "300px" }}
        >
          <div className="bs-docs-section">
            <Card title="Login">
              <div className="row">
                <span>{this.state.mensagemErro}</span>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="bs-component">
                    <fieldset>
                      <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                        <input
                          value={this.state.email}
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Digite o Email"
                        ></input>
                      </FormGroup>
                      <FormGroup
                        label="Senha: *"
                        htmlFor="exampleInputPassword1"
                      >
                        <input
                          value={this.state.senha}
                          onChange={(e) =>
                            this.setState({ senha: e.target.value })
                          }
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Digite sua Senha"
                        ></input>
                      </FormGroup>
                      <br />
                      <button onClick={this.entrar} className="btn btn-success">
                        <i className="pi pi-sign-in p-mr-2"></i> Entrar
                      </button>
                      <button
                        onClick={this.prepareCadastrar}
                        className="btn btn-danger"
                      >
                        <i className="pi pi-plus p-mr-2"></i> Cadastrar
                      </button>
                    </fieldset>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

Login.contextType = AuthContext;

export default withRouter(Login);
