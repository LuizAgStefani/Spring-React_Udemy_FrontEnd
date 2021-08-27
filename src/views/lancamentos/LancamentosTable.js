/* eslint-disable import/no-anonymous-default-export */
import React from "react";

export default (props) => {

    const rows = props.lancamentos.map((row, index) => {
        return (
            <tr key={row.id}>
                <td>{row.descricao}</td>
                <td>{row.valor}</td>
                <td>{row.tipo}</td>
                <td>{row.mes}</td>
                <td>{row.status}</td>
                <td>{row.acoes}</td>
            </tr>
        )
    })

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
      <tbody>
          {rows}
      </tbody>
    </table>
  );
};
