import React from "react";

import { Route, Switch, HashRouter, Redirect, Router } from "react-router-dom";
import CadastroUsuario from "../views/CadastroUsuario";
import Home from "../views/Home";
import Login from "../views/Login";
import ConsultaLancamentos from "../views/lancamentos/ConsultaLancamentos";
import CadastroLancamento from "../views/lancamentos/CadastroLancamento";
import { AuthConsumer } from "../main/ProvedorAutenticacao";

function RotaAutenticada({
  component: Component,
  isUsuarioAutenticado,
  ...props
}) {
  return (
    <Route
      {...props}
      render={(componentProps) => {
        if (isUsuarioAutenticado) {
          return <Component {...componentProps} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: componentProps.location },
              }}
            />
          );
        }
      }}
    />
  );
}

function Rotas(props) {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/cadastro-usuarios" component={CadastroUsuario} />

        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/home"
          component={Home}
        />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/consulta-lancamentos"
          component={ConsultaLancamentos}
        />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/cadastro-lancamentos/:id?"
          component={CadastroLancamento}
        />
      </Switch>
    </HashRouter>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <AuthConsumer>
    {(context) => <Rotas isUsuarioAutenticado={context.isAutenticado} />}
  </AuthConsumer>
);
