import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import * as messages from "../../components/Toastr";

import Card from "../../components/Card";
import FormGroup from "../../components/FormGroup";
import SelectMenu from "../../components/SelectMenu";

import LancamentoService from "../../app/service/LancamentoService";
import LocalStorageService from "../../app/service/LocalStorageService";

class CadastroLancamento extends Component {
  state = {
    id: null,
    descricao: "",
    valor: "",
    ano: "",
    mes: "",
    tipo: "",
    status: "",
    usuario: null,
    atualizando: false,
  };

  constructor() {
    super();
    this.service = new LancamentoService();
    this.LocalStorageService = new LocalStorageService();
  }

  componentDidMount() {
    const params = this.props.match.params;
    if (params.id) {
      this.service
        .obterPorId(params.id)
        .then((response) => {
          this.setState({ ...response.data, atualizado: true });
        })
        .catch((error) => {
          messages.mensagemErro(error.response.data);
        });
    }
    console.log("params: ", params);
  }

  submit = () => {

    const usuarioLogado = LocalStorageService.obterItem("_usuario_logado");

    const { descricao, valor, mes, ano, tipo } = this.state;
    const lancamento = {
      descricao,
      valor,
      mes,
      ano,
      tipo,
      usuario: usuarioLogado.id
    };

    try {
      this.service.validar(lancamento);
    } catch (erro) {
      const mensagens = erro.mensagens;
      mensagens.forEach(msg => {
        messages.mensagemErro(msg)
      });
      return false;
    }

    this.service
      .salvar(lancamento)
      .then((response) => {
        this.props.history.push("/consulta-lancamentos");
        messages.mensagemSucesso("Lançamento cadastrado com sucesso");
      })
      .catch((error) => {
        messages.mensagemErro(error.response.data);
      });
  };

  atualizar = () => {
    const { descricao, valor, mes, ano, tipo, status, id, usuario } =
      this.state;
    const lancamento = {
      descricao,
      valor,
      mes,
      ano,
      tipo,
      id,
      usuario,
      status,
    };

    this.service
      .atualizar(lancamento)
      .then((response) => {
        this.props.history.push("/consulta-lancamentos");
        messages.mensagemSucesso("Lançamento atualizado com sucesso");
      })
      .catch((error) => {
        messages.mensagemErro(error.response.data);
      });
  };

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  render() {
    const tipos = this.service.obterTiposLancamentos();
    const meses = this.service.obterListaMeses();

    return (
      <Card
        title={
          this.state.atualizado
            ? "Atualização de Lançamento"
            : "Cadastro de Lançamento"
        }
      >
        <div className="row">
          <div className="col-md-12">
            <FormGroup htmlFor="inputDescricao" label="Descrição: *">
              <input
                id="inputDescricao"
                type="text"
                className="form-control"
                name="descricao"
                value={this.state.descricao}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup htmlFor="inputAno" label="Ano: *">
              <input
                id="inputAno"
                type="text"
                className="form-control"
                name="ano"
                value={this.state.ano}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup htmlFor="inputMes" label="Mês: *">
              <SelectMenu
                id="inputMes"
                lista={meses}
                className="form-control"
                value={this.state.mes}
                name="mes"
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup htmlFor="inputValor" label="Valor: *">
              <input
                id="inputValor"
                type="text"
                className="form-control"
                value={this.state.valor}
                onChange={this.handleChange}
                name="valor"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup htmlFor="inputTipo" label="Tipo: *">
              <SelectMenu
                id="inputTipo"
                lista={tipos}
                className="form-control"
                value={this.state.tipo}
                name="tipo"
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup htmlFor="inputStatus" label="Status: ">
              <input
                type="text"
                className="form-control"
                disabled
                value={this.state.status}
                name="status"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <br />
            {this.state.atualizado ? (
              <button onClick={this.atualizar} className="btn btn-primary">
                <i className="pi pi-refresh p-mr-2"></i> Atualizar
              </button>
            ) : (
              <button onClick={this.submit} className="btn btn-success">
                <i className="pi pi-save p-mr-2"></i> Salvar
              </button>
            )}

            <button
              onClick={(e) => this.props.history.push("/consulta-lancamentos/")}
              className="btn btn-danger"
            >
              <i className="pi pi-times p-mr-2"></i> Cancelar
            </button>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroLancamento);
