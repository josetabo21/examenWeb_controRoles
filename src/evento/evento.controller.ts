import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Evento, EventoService} from "./evento.service";
import {EventoEntity} from "./evento.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {Like} from "typeorm";
import {Usuario} from "../usuario/usuario.service";
import {UsuarioCreateDto} from "../usuario/dto/usuario-create.dto";
import {validate, ValidationError} from "class-validator";
import {EventoCreateDto} from "./dto/evento-create.dto";


@Controller('Evento')
export class EventoController {

    constructor(
        private readonly _eventoService: EventoService,
    ) {

    }



    @Get('admin')
    async admin(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busqueda') busqueda: string,
        @Session() sesion,
    ) {


        let mensaje; // undefined
        let clase; // undefined

        if (accion && nombre) {
            switch (accion) {
                case 'actualizar':
                    clase = 'info';
                    mensaje = `Registro ${nombre} actualizado`;
                    break;
                case 'borrar':
                    clase = 'danger';
                    mensaje = `Registro ${nombre} eliminado`;
                    break;
                case 'crear':
                    clase = 'success';
                    mensaje = `Registro ${nombre} creado`;
                    break;
            }
        }

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
        // console.log("INICIO: "+ esUsuario+"....."+esAdministrador);

        response.render('gestionEventos', {
            nombre: 'Rafael',
            arreglo: eventos,
            mensaje: mensaje,
            accion: clase,
            titulo: 'Gestion de eventos',
            esUsuario: esUsuario,
            esAdministrador: esAdministrador
        });
    }

    @Get('detalle/:idEvento')
    async detalle(
        @Res() response,
        @Param('idEvento') idEvento: string,
        @Session() sesion
    ){

        let evento = await this._eventoService.buscarPorId(Number(idEvento));
        let esUsuario = sesion.esUsuario;
        let esAdministrador = sesion.esAdministrador;
        let titulo = evento.nombre;
        response.render('detalleEvento',{
            evento: evento,
            titulo: titulo,
            esUsuario: esUsuario,
            esAdministrador: esAdministrador
        })


    }




    @Post('borrar/:idEvento')
    async borrar(
        @Param('idEvento') idEvento: string,
        @Res() response,
        @Session() sesion
    ) {
        const eventoEncontrado = await this._eventoService
            .buscarPorId(+idEvento);

        await this._eventoService.borrar(Number(idEvento));

        response.redirect('/Evento/admin');
    }


    @Post('actualizar/:idEvento')
    async actualizarEventoFormulario(
        @Body() evento: Evento,
        @Param('idEvento') idEvento: string,
        @Res() response,
        @Session() sesion
    ) {
        const eventoValidado = new EventoCreateDto();
        console.log(Number(evento.latitud));
        eventoValidado.nombre = evento.nombre;
        eventoValidado.fecha = new Date(evento.fecha);
        eventoValidado.latitud = Number(evento.latitud);
        eventoValidado.longitud = Number(evento.longitud);

        const errores: ValidationError[] = await validate(eventoValidado);

        console.log(evento.id);

        const hayErrores = errores.length > 0;

        let mensaje = '';

        if(hayErrores){

            console.error(errores);

            errores.forEach((error)=>{
                mensaje=mensaje+"\n"+JSON.stringify(error.constraints);
            })

            let eventos = await this._eventoService.buscar();
            let esUsuario = sesion.esUsuario;
            let esAdministrador = sesion.esAdministrador;

            response.render('gestionEventos', {
                nombre: 'Rafael',
                arreglo: eventos,
                mensaje: mensaje,
                titulo: 'Gestion de eventos',
                esUsuario: esUsuario,
                esAdministrador: esAdministrador
            });

        }else{

            await this._eventoService.actualizar(Number(idEvento), evento);
            response.redirect('/Evento/admin');


        }

    }


    @Post('crear')
    async crearEventoFormulario(
        @Body() evento: Evento,
        @Res() response,
        @Session() sesion
    ) {
        const eventoValidado = new EventoCreateDto();
        console.log(evento);
        eventoValidado.nombre = evento.nombre;
        eventoValidado.fecha = new Date(evento.fecha);
        eventoValidado.latitud = Number(evento.latitud);
        eventoValidado.longitud = Number(evento.longitud);


        const errores: ValidationError[] = await validate(eventoValidado);

        console.log(evento.id);

        const hayErrores = errores.length > 0;

        let mensaje = '';

        if(hayErrores){

            console.error(errores);

            errores.forEach((error)=>{
                mensaje=mensaje+"\n"+JSON.stringify(error.constraints);
            })

            let eventos = await this._eventoService.buscar();
            let esUsuario = sesion.esUsuario;
            let esAdministrador = sesion.esAdministrador;

            response.render('gestionEventos', {
                nombre: 'Rafael',
                arreglo: eventos,
                mensaje: mensaje,
                titulo: 'Gestion de eventos',
                esUsuario: esUsuario,
                esAdministrador: esAdministrador
            });

        }else{

            await this._eventoService.crear(evento);
            response.redirect('/Evento/admin');


        }

    }




}