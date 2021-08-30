import React, { Component } from "react";
import Card from "../components/Card";
import FormGroup from "../components/FormGroup";
import { withRouter } from "react-router-dom";
import UsuarioService from "../app/service/UsuarioService";

import { mensagemSucesso, mensagemErro } from "../components/Toastr";

class CadastroUsuario extends Component {
  constructor() {
    super();
    this.service = new UsuarioService();
  }

  state = {
    nome: "",
    email: "",
    senha: "",
    senhaRepetida: "",
  };

  cadastrar = () => {
    const { nome, email, senha, senhaRepetida } = this.state;

    const usuario = {
      nome,
      email,
      senha,
      senhaRepetida,
    };

    try{
      this.service.validar(usuario)
    }catch(erro){
      const msgs = erro.mensagens;
      msgs.forEach(msg => {
        mensagemErro(msg)
      })
      return false;
    }

    this.service
      .cadastrar(usuario)
      .then((response) => {
        mensagemSucesso(
          "Usuário cadastrado com sucesso! Faça o login para acessar o sistema."
        );
        this.props.history.push("/login");
      })
      .catch((erro) => {
        mensagemErro(erro.response.data);
      });
  };

  cancelarCadastro = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <Card title="Cadastro de Usuário">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome: *" htmlFor="inputNome">
                <input
                  type="text"
                  id="inputNome"
                  name="nome"
                  onChange={(e) => this.setState({ nome: e.target.value })}
                  className="form-control"
                />
              </FormGroup>
              <FormGroup label="Email: *" htmlFor="inputEmail">
                <input
                  type="email"
                  id="inputEmail"
                  name="email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                  className="form-control"
                />
              </FormGroup>
              <FormGroup label="Senha: *" htmlFor="inputSenha">
                <input
                  type="password"
                  id="inputSenha"
                  name="senha"
                  onChange={(e) => this.setState({ senha: e.target.value })}
                  className="form-control"
                />
              </FormGroup>
              <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                <input
                  type="password"
                  id="inputRepitaSenha"
                  name="senha"
                  onChange={(e) =>
                    this.setState({ senhaRepetida: e.target.value })
                  }
                  className="form-control"
                />
              </FormGroup>
              <br></br>
              <button
                onClick={this.cadastrar}
                type="button"
                className="btn btn-success"
              >
                <i className="pi pi-save p-mr-2"></i> Salvar
              </button>
              <button
                onClick={this.cancelarCadastro}
                type="button"
                className="btn btn-danger"
              >
                <i className="pi pi-times p-mr-2"></i> Cancelar
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroUsuario);
