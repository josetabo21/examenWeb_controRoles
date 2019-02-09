import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import { EventoPorPokemonService} from "./eventoPorPokemon.service";
import {EventoPorPokemonEntity} from "./eventoPorPokemon.entity";
import {EventoService} from "../evento/evento.service";



@Controller('EventoPorPokemon')
export class EventoPorPokemonController {

    constructor(
        private readonly _eventoPorPokemonService: EventoPorPokemonService,
        private readonly _eventoService: EventoService,
    ) {

    }


    @Get('biblioteca')
    async miBiblioteca(
        @Res() response,
        @Session() sesion,
    ) {

        if(typeof sesion.usuarioEntidad !== 'undefined'){
            let eventoPorPokemon: EventoPorPokemonEntity[];

            eventoPorPokemon = await this._eventoPorPokemonService.buscarBiblioteca(sesion.usuarioEntidad.id);

            console.log("AQUI ", eventoPorPokemon);

            let esUsuario = sesion.esUsuario;
            let esAdministrador = sesion.esAdministrador;
            // console.log("INICIO: "+ esUsuario+"....."+esAdministrador);

            response.render('biblioteca', {
                nombre: 'Rafael',
                eventoPorPokemon: eventoPorPokemon,
                titulo: 'Eventos',
                esUsuario: esUsuario,
                esAdministrador: esAdministrador
            });
        }else{
            response.render('biblioteca', {
                nombre: 'Rafael',
                titulo: 'Eventos',
            });
        }


    }

    @Get('detalle/:idEvento')
    async detalle(
        @Res() response,
        @Param('idEvento') idEvento: string,
        @Session() sesion,
    ) {


            let eventoPorPokemon: EventoPorPokemonEntity[];

            eventoPorPokemon = await this._eventoPorPokemonService.buscarBiblioteca(Number(idEvento));
            let evento = await this._eventoService.buscarPorId(Number(idEvento));
            console.log("AQUI ", eventoPorPokemon);

            let esUsuario = sesion.esUsuario;
            let esAdministrador = sesion.esAdministrador;
            // console.log("INICIO: "+ esUsuario+"....."+esAdministrador);

            response.render('detalleEvento', {
                nombre: 'Rafael',
                eventoPorPokemon: eventoPorPokemon,
                titulo: 'Evento',
                esUsuario: esUsuario,
                evento: evento,
                esAdministrador: esAdministrador
            });



    }


    @Post('borrar/:idEventoPorPokemon')
    async borrar(
        @Param('idEventoPorPokemon') idEventoPorPokemon: string,
        @Res() response,
        @Session() sesion
    ) {

        await this._eventoPorPokemonService.borrar(Number(idEventoPorPokemon));

        console.log("BORRAR:"+sesion.esUsuario+"......."+sesion.esAdministrador);

        response.redirect('/biblioteca/items/');
    }
}
