import React, { Component } from "react";
import Card from "../../components/Card";
import { withRouter } from "react-router-dom";
import FormGroup from "../../components/FormGroup";
import SelectMenu from "../../components/SelectMenu";
import LancamentosTable from "./LancamentosTable";

import LancamentoService from "../../app/service/LancamentoService";
import LocalStorageService from "../../app/service/LocalStorageService";

import * as messages from "../../components/Toastr";

import { ConfirmDialog } from "primereact/confirmdialog"; // To use <ConfirmDialog> tag
class ConsultaLancamentos extends Component {
  state = {
    ano: "",
    mes: "",
    tipo: "",
    descricao: "",
    showConfirmDialog: false,
    lancamentoDeletar: {},
    lancamentos: [],
  };

  constructor() {
    super();
    this.lancamentoService = new LancamentoService();
    this.localstorageService = new LocalStorageService();
  }

  buscar = () => {
    if (!this.state.ano) {
      messages.mensagemErro('O campo "Ano" é obrigatório.');
      return false;
    }

    if (!this.state.mes) {
      messages.mensagemErro('O campo "Mês" é obrigatório.');
      return false;
    }

    const usuarioLogado = LocalStorageService.obterItem("_usuario_logado");

    const lancamentoFiltro = {
      ano: this.state.ano,
      mes: this.state.mes,
      tipo: this.state.tipo,
      descricao: this.state.descricao,
      usuario: usuarioLogado.id,
    };

    this.lancamentoService
      .consultar(lancamentoFiltro)
      .then((resposta) => {
        const lista = resposta.data
        if(lista.length < 1){
          messages.mensagemAlert('Nenhum resultado foi encontrado.')
        }
        this.setState({ lancamentos: lista });
      })
      .catch((erro) => {
        messages.mensagemErro(erro);
      });
  };

  editar = (id) => {
    this.props.history.push(`/cadastro-lancamentos/${id}`);
  };

  abrirConfirmacao = (Lancamento) => {
    this.setState({ showConfirmDialog: true, lancamentoDeletar: Lancamento });
  };

  cancelarConfirmacao = () => {
    this.setState({ showConfirmDialog: false, lancamentoDeletar: {} });
  };

  deletar = () => {
    this.lancamentoService
      .deletar(this.state.lancamentoDeletar.id)
      .then((response) => {
        const lancamentos = this.state.lancamentos;
        const index = lancamentos.indexOf(this.state.lancamentoDeletar);
        lancamentos.splice(index, 1);
        this.setState(lancamentos);
        messages.mensagemSucesso("Lançamento deletado com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro("Ocorreu um erro ao tentar deletar o Lançamento");
      });
  };

  alterarStatus = (lancamento, status) => {
    this.lancamentoService
      .alterarStatus(lancamento.id, status)
      .then((response) => {
        const lancamentos = this.state.lancamentos;
        const index = lancamentos.indexOf(lancamento);
        if (index !== -1) {
          lancamento["status"] = status;
          lancamentos[index] = lancamento;
          this.setState({ lancamentos });
        }
        messages.mensagemSucesso("Status atualizado com sucesso!");
      });
  };

  render() {
    const meses = this.lancamentoService.obterListaMeses();

    const tipos = this.lancamentoService.obterTiposLancamentos();

    return (
      <Card title="Consulta Lançamentos">
        <div className="row">
          <div className="col-md-6">
            <div className="bs-component">
              <FormGroup label="Descrição: " htmlFor="inputDescricao">
                <input
                  value={this.state.descricao}
                  onChange={(e) => this.setState({ descricao: e.target.value })}
                  type="text"
                  className="form-control"
                  id="inputDescricao"
                  placeholder="Digite a Descrição"
                ></input>
              </FormGroup>
              <br />
              <FormGroup label="Ano: *" htmlFor="inputAno">
                <input
                  value={this.state.ano}
                  onChange={(e) => this.setState({ ano: e.target.value })}
                  type="number"
                  className="form-control"
                  id="inputAno"
                  placeholder="Digite o Ano"
                ></input>
              </FormGroup>
              <br></br>
              <FormGroup label="Mês: *" htmlFor="inputMes">
                <SelectMenu
                  value={this.state.mes}
                  onChange={(e) => this.setState({ mes: e.target.value })}
                  id="inputMes"
                  className="form-control"
                  lista={meses}
                />
              </FormGroup>
              <br></br>
              <FormGroup label="Tipo de Lançamento: " htmlFor="inputTipo">
                <SelectMenu
                  value={this.state.tipo}
                  onChange={(e) => this.setState({ tipo: e.target.value })}
                  id="inputTipo"
                  className="form-control"
                  lista={tipos}
                />
              </FormGroup>
              <br />
              <button
                type="button"
                onClick={this.buscar}
                className="btn btn-success"
              >
                <i className="pi pi-search p-mr-2"></i> Buscar
              </button>
              <button
                onClick={(e) =>
                  this.props.history.push("/cadastro-lancamentos")
                }
                type="button"
                className="btn btn-danger"
              >
                <i className="pi pi-plus p-mr-2"> </i> Cadastrar
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <br />
              <LancamentosTable
                lancamentos={this.state.lancamentos}
                editar={this.editar}
                deletar={this.abrirConfirmacao}
                alterarStatus={this.alterarStatus}
              />
            </div>
          </div>
        </div>
        <div>
          <ConfirmDialog
            visible={this.state.showConfirmDialog}
            onHide={() => this.setState({ showConfirmDialog: false })}
            message="Confirma a exclusão desse lançamento?"
            header="Confirmação"
            icon="pi pi-exclamation-triangle"
            accept={this.deletar}
            reject={this.cancelarConfirmacao}
            acceptLabel={"Sim"}
            rejectLabel={"Não"}
          />
        </div>
      </Card>
    );
  }
}

export default withRouter(ConsultaLancamentos);
