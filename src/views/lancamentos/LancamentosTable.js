/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import currencyFormatter from "currency-formatter";

export default (props) => {
  const lancamentos = props.lancamentos.map((lancamento, index) => {
    return (
      <tr key={lancamento.id}>
        <td>{lancamento.descricao}</td>
        <td>
          {currencyFormatter.format(lancamento.valor, { locale: "pt-BR" })}
        </td>
        <td>{lancamento.tipo}</td>
        <td>{lancamento.mes}</td>
        <td>{lancamento.status}</td>
        <td>
          <button
            disabled={lancamento.status !== "PENDENTE"}
            title="Efetivar"
            onClick={(e) => props.alterarStatus(lancamento, "EFETIVADO")}
            type="button"
            className="btn btn-success"
          >
            <i className="pi pi-check p-mr-2"></i>
          </button>
          <button
            disabled={lancamento.status !== "PENDENTE"}
            title="Cancelar"
            onClick={(e) => props.alterarStatus(lancamento, "CANCELADO")}
            type="button"
            className="btn btn-warning"
          >
            <i className="pi pi-times p-mr-2"></i>
          </button>
          <button
            title="Editar"
            type="button"
            className="btn btn-primary"
            onClick={(e) => props.editar(lancamento.id)}
          >
            <i className="pi pi-pencil p-mr-2"></i>
          </button>
          <button
            title="Deletar"
            type="button"
            className="btn btn-danger"
            onClick={(e) => props.deletar(lancamento)}
          >
            <i className="pi pi-trash p-mr-2"></i>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Valor</th>
          <th scope="col">Tipo</th>
          <th scope="col">Mês</th>
          <th scope="col">Situação</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>{lancamentos}</tbody>
    </table>
  );
};
