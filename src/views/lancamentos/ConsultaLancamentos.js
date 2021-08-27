import React, { Component } from "react";
import Card from "../../components/Card";
import { withRouter } from "react-router-dom";
import FormGroup from "../../components/FormGroup";
import SelectMenu from "../../components/SelectMenu";
import LancamentosTable from "./LancamentosTable";

import LancamentoService from "../../app/service/LancamentoService";
import LocalStorageService from "../../app/service/LocalStorageService"

import {mensagemErro} from "../../components/Toastr"
class ConsultaLancamentos extends Component {
  state = {
    ano: "",
    mes: "",
    tipo: "",
    lancamentos: []
  };

  constructor(){
    super();
    this.lancamentoService = new LancamentoService();
    this.localstorageService = new LocalStorageService();
  }

  buscar = () => {

    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

    const lancamentoFiltro = {
      ano: this.state.ano,
      mes: this.state.mes,
      tipo: this.state.tipo,
      usuario: usuarioLogado.id
    }

    this.lancamentoService
    .consultar(lancamentoFiltro)
    .then(resposta => {
      this.setState({lancamentos: resposta.data})
    })
    .catch(erro => {
      mensagemErro(erro)
    })
  }

  render() {
    const meses = [
      { label: "Selecione...", value: "" },
      { label: "Janeiro", value: 1 },
      { label: "Fevereiro", value: 2 },
      { label: "Março", value: 3 },
      { label: "Abril", value: 4 },
      { label: "Maio", value: 5 },
      { label: "Junho", value: 6 },
      { label: "Julho", value: 7 },
      { label: "Agosto", value: 8 },
      { label: "Setembro", value: 9 },
      { label: "Outubro", value: 10 },
      { label: "Novembro", value: 11 },
      { label: "Dezembro", value: 12 },
    ];

    const tipos = [
      { label: "Selecione...", value: "" },
      { label: "Despesa", value: "DESPESA" },
      { label: "Receita", value: "RECEITA" },
    ];

    return (
      <Card title="Consulta Lançamentos">
        <div className="row">
          <div className="col-md-6">
            <div className="bs-component">
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
              <LancamentosTable lancamentos={this.state.lancamentos} />
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(ConsultaLancamentos);
