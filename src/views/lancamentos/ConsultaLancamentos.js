import React, { Component } from "react";
import Card from "../../components/Card";
import { withRouter } from "react-router-dom";
import FormGroup from "../../components/FormGroup";
import SelectMenu from "../../components/SelectMenu";
import LancamentosTable from "./LancamentosTable";

import LancamentoService from "../../app/service/LancamentoService";
import LocalStorageService from "../../app/service/LocalStorageService"

import * as messages from "../../components/Toastr"
class ConsultaLancamentos extends Component {
  state = {
    ano: "",
    mes: "",
    tipo: "",
    descricao: "",
    lancamentos: []
  };

  constructor(){
    super();
    this.lancamentoService = new LancamentoService();
    this.localstorageService = new LocalStorageService();
  }

  buscar = () => {

    if(!this.state.ano){
      messages.mensagemErro('O campo "Ano" é obrigatório.')
      return false;
    }

    if(!this.state.mes){
      messages.mensagemErro('O campo "Mês" é obrigatório.')
      return false;
    }

    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

    const lancamentoFiltro = {
      ano: this.state.ano,
      mes: this.state.mes,
      tipo: this.state.tipo,
      descricao: this.state.descricao,
      usuario: usuarioLogado.id
    }

    this.lancamentoService
    .consultar(lancamentoFiltro)
    .then(resposta => {
      this.setState({lancamentos: resposta.data})
    })
    .catch(erro => {
      messages.mensagemErro(erro)
    })
  }

  editar = (id) => {
    console.log(id)
  }

  deletar = (id) => {
    console.log(id)
  }

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
              <br/>
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
              <button type="button" onClick={this.buscar} className="btn btn-success">
                Buscar
              </button>
              <button type="button" className="btn btn-danger">
                Cancelar
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <br />
              <LancamentosTable lancamentos={this.state.lancamentos} editar={this.editar} deletar={this.deletar}/>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(ConsultaLancamentos);
