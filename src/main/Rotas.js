import React from 'react';

import {Route, Switch, HashRouter} from 'react-router-dom';
import CadastroUsuario from '../views/CadastroUsuario';
import Home from '../views/Home';
import Login from '../views/Login';

export default function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
            </Switch>
        </HashRouter>
    )
}