import ApiService from "../ApiService";

class UsuarioService extends ApiService {

    constructor(){
        super('api/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`);
    }

    cadastrar(usuario){
        return this.post('/', usuario);
    }

}

export default UsuarioService;