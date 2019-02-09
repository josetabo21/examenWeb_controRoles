import {
    Get,
    Controller,
    Request,
    Response,
    Headers,
    HttpCode,
    HttpException,
    Query,
    Param,
    Res,
    Post, Body, Session, BadRequestException
} from '@nestjs/common';
import {AppService} from './app.service';
import {Observable, of} from "rxjs";
import {Usuario, UsuarioService} from "./usuario/usuario.service";
import {ExpressionStatement} from "typescript";
import {Code} from "typeorm";
import {RolesPorUsuarioService} from "./rolesPorUsuario/rolesPorUsuario.service";
import {VideojuegoService} from "../../../Proyecto/proyecto/src/videojuego/videojuego.service";
import {EventoService} from "./evento/evento.service";
import {VideojuegoEntity} from "../../../Proyecto/proyecto/src/videojuego/videojuego.entity";
import {EventoEntity} from "./evento/evento.entity";
import {Like} from "typeorm";
// http://192.168.1.2:3000/Usuario/saludar     METODO -> GET
// http://192.168.1.2:3000/Usuario/salir   METODO -> POST
// http://192.168.1.2:3000/Usuario/registrar METODO -> PUT
// http://192.168.1.2:3000/Usuario/borrar METODO -> DELETE
// http://192.168.1.2:3000/Notas


// Decorador -> FUNCION
// SE EJECUTA ANTES DE ALGO
@Controller() // Decoradores!
export class AppController {

    // CONSTRUCTOR NO ES UN CONSTRUCTOR NORMAL!!!

    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _eventoService: EventoService,
        private readonly _rolesPorUsuarioService: RolesPorUsuarioService,
        // private readonly _appService:AppService,
    ) {

    }



    @Get('inicio')
    async inicio(
        @Res() response,
        @Query('busqueda') busqueda: string,
        @Session() sesion,
    ) {


        let mensaje; // undefined

        let eventos: EventoEntity[];
        if (busqueda) {

            const consulta = {
                where: [
                    {
                        nombre: Like(`%${busqueda}%`)
                    }
                ]
            };
            eventos = await this._eventoService.buscar(consulta);
        } else {
            eventos = await this._eventoService.buscar();
        }


        let esUsuario = sesion.esUsuario;
        let esAdministrador = sesion.esAdministrador;
        console.log("INICIO: "+ esUsuario+"....."+esAdministrador);

        response.render('inicio', {
            nombre: 'Rafael',
            arreglo: eventos,
            mensaje: mensaje,
            titulo: 'Eventos pokemon',
            esUsuario: esUsuario,
            esAdministrador: esAdministrador
        });
    }


    @Post('login')
    @HttpCode(200)
    async loginMetodo(
        @Body('correo') correo: string,
        @Body('password') password: string,
        @Res() response,
        @Session() sesion
    ) {
        const identificado = await this._usuarioService
            .login(correo, password);

        if (identificado) {

            sesion.usuario = correo;
            sesion.usuarioEntidad = await this._usuarioService.encontrarUsuario(correo);

            const usuarioActual = await this._usuarioService.encontrarUsuario(correo);
            const idUsuarioActual = usuarioActual.id;
            const rolesActuales = await this._rolesPorUsuarioService.buscar(idUsuarioActual);
            console.log("ROLES ACTUALES: "+JSON.stringify(rolesActuales));
            const esAdministrador = await rolesActuales.some(elemento=>elemento.rol.nombre === 'Administrador');
            const esUsuario = await rolesActuales.some(elemento=>elemento.rol.nombre === 'Usuario');

            sesion.esUsuario=esUsuario;
            sesion.esAdministrador=esAdministrador;
           // response.redirect('/saludar');
            //const parametrosConsulta = `?accion=crear&nombre=${usuario.nombre}`;

            console.log("LOGIN: "+sesion.esUsuario+"...."+sesion.esAdministrador);


            response.redirect('/inicio');

        } else {

            response.render('login',{
                    mensaje: "Fallo en login",
                    titulo: "Iniciar sesion"
            });

           // throw new BadRequestException({mensaje: 'Error login'})
        }

    }

    @Get('login')
    loginVista(
        @Res() response

    ) {
        response.render('login');
    }

    @Get('logout')
    logout(
        @Res() response,
        @Session() sesion,
    ) {
        sesion.usuario = undefined;
        sesion.destroy();
        response.redirect('/inicio');

    }

    @Get('registrarse')
  registrarseVista(
      @Res() response
    ){
      response.render('crear-usuario');
    }



}
