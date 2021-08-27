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

  validar() {
    const msgs = [];

    if (!this.state.nome) {
      msgs.push("O campo Nome é obrigatório.");
    }

    if (!this.state.email) {
      msgs.push("O campo Email é obrigatório.");
    } else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      msgs.push("Informe um Email válido.");
    }

    if (!this.state.senha || !this.state.senhaRepetida) {
      msgs.push("Digite a senha 2x.");
    } else if (this.state.senha !== this.state.senhaRepetida) {
      msgs.push("As senhas não são iguais.");
    }

    return msgs;
  }

  cadastrar = () => {
    const msgs = this.validar();

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        mensagemErro(msg);
      });
      return false;
    }

    const usuario = {
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha,
    };

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
              <button
                onClick={this.cadastrar}
                type="button"
                className="btn btn-success"
              >
                Salvar
              </button>
              <button
                onClick={this.cancelarCadastro}
                type="button"
                className="btn btn-danger"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroUsuario);
