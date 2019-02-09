import {Body, Controller, Get, HttpCode, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Entrenador, EntrenadorService} from "./entrenador.service";
import {EntrenadorEntity} from "./entrenador.entity";
import {Like} from "typeorm";
import {validate, ValidationError} from "class-validator";
import {EntrenadorCreateDto} from "./dto/entrenador-create.dto";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {CarritoEntity} from "../../../../Proyecto/proyecto/src/carrito/carrito.entity";
import {EventoService} from "../evento/evento.service";
import {Pokemon, PokemonService} from "../pokemon/pokemon.service";
import {EventoPorPokemonService} from "../eventoPorPokemon/eventoPorPokemon.service";
import {PokemonEntity} from "../pokemon/pokemon.entity";
import {EventoPorPokemonEntity} from "../eventoPorPokemon/eventoPorPokemon.entity";
import {PokemonCreateDto} from "../pokemon/dto/pokemon-create.dto";

@Controller('Entrenador')
export class EntrenadorController {

    constructor(
        private readonly _entrenadorService: EntrenadorService,
        private readonly _eventoService: EventoService,
        private readonly _pokemonService: PokemonService,
        private readonly _eventoPorPokemonService: EventoPorPokemonService,
    ) {

    }

    @Get('registrarEntrenador')
    registrarEntrenadorVista(
        @Res() response,
        @Session() sesion
    ) {
        response.render('rolUsuario/crearEntrenador',
            {
                esUsuario: sesion.esUsuario,
                esAdministrador: sesion.esAdministrador
        });
    }

    @Get('registrarPokemon')
    async registrarPokemonVista(
        @Res() response,
        @Session() sesion,

    ) {
        let mensaje;
        let entrenadores : EntrenadorEntity[];
        entrenadores= await this._entrenadorService.buscarPorUsuario(Number(sesion.usuarioEntidad.id));
        //sesion.entrenadores = entrenadores;

        console.log("REGET: "+entrenadores.length);
        if(entrenadores.length<1){
            mensaje="NO TIENES ENTRENADORES REGISTRADOS"
        }


        response.render('rolUsuario/crearPokemon',
            {
                mensaje: mensaje,
                arregloEntrenadores: entrenadores,
                esUsuario: sesion.esUsuario,
                esAdministrador: sesion.esAdministrador
            });
    }

    @Post('crearPokemon')
    async crearPokemonFormulario(
        @Body() pokemon: Pokemon,
        @Res() response,
        @Session() sesion,


    ) {
        const pokemonValidado = new PokemonCreateDto();

        pokemonValidado.numeroPokemon = Number(pokemon.numeroPokemon);
        pokemonValidado.nombrePokemon= pokemon.nombrePokemon;
        pokemonValidado.poderEspecialUno= pokemon.poderEspecialUno;
        pokemonValidado.poderEspecialDos= pokemon.poderEspecialDos;
        pokemonValidado.fechaCaptura = new Date(pokemon.fechaCaptura);
        pokemonValidado.nivel = Number(pokemon.nivel);

        const errores: ValidationError[] = await validate(pokemonValidado);
        let entrenadores : EntrenadorEntity[];
        entrenadores= await this._entrenadorService.buscarPorUsuario(Number(sesion.usuarioEntidad.id));

        console.log(pokemon.entrenador);

        const hayErrores = errores.length > 0;

        let mensaje='';

        if(hayErrores){

            console.error(errores);

            errores.forEach((error)=>{
                mensaje=mensaje+"\n"+JSON.stringify(error.constraints);
            })

            response.render(
                'rolUsuario/crearPokemon',
                {mensaje:mensaje,
                    esUsuario:sesion.esUsuario,
                    arregloEntrenadores: entrenadores,
                    esAdministrador:sesion.esAdministrador}
            )

        }else{
            // try {

            await this._pokemonService.crear(pokemon);
            response.redirect('/inicio');
            //  }catch(err){

            //      response.render(
            //          'crear-usuario',{mensaje:"correo ya registrado"}
            //      )
            //   }

        }



    }


    @Post('crear-entrenador')
    async crearEntrenadorFormulario(
        @Body() entrenador: Entrenador,
        @Res() response,
        @Session() sesion
    ) {
        const entrenadorValidado = new EntrenadorCreateDto();
        console.log(entrenador.campeonActual);
        entrenadorValidado.nombres = entrenador.nombres;
        entrenadorValidado.apellidos = entrenador.apellidos;
        entrenadorValidado.fechaNacimiento = new Date(entrenador.fechaNacimiento);
        entrenadorValidado.numeroMedallas = Number(entrenador.numeroMedallas);
        entrenadorValidado.campeonActual = Boolean(entrenador.campeonActual);
        entrenador.usuario = sesion.usuarioEntidad;



        const errores: ValidationError[] = await validate(entrenadorValidado);

        //console.log(entrenador.id);

        const hayErrores = errores.length > 0;

        let mensaje = '';
        let existe = await this._entrenadorService.existeCampeon();


        if(hayErrores){

            console.error(errores);

            errores.forEach((error)=>{
                mensaje=mensaje+"\n"+JSON.stringify(error.constraints);
            })

            response.render(
                'rolUsuario/crearEntrenador',
                {mensaje:mensaje,
                    esUsuario: sesion.esUsuario,
                    esAdministrador: sesion.esAdministrador},
            )

        }else if(!existe){
            await this._entrenadorService.crear(entrenador);
            response.redirect('/inicio');

        }

        else{
            mensaje="Ya existe un campeón!!!";
            response.render(

                'rolUsuario/crearEntrenador',
                {mensaje:mensaje,
                    esUsuario: sesion.esUsuario,
                    esAdministrador: sesion.esAdministrador},



            )

        }
    }

    @Get('participar/:idEvento')
    async participar(
        @Param('idEvento') idEvento: string,
        @Session() sesion,
        @Res() response
    ){

        const esUsuario = sesion.esUsuario;
        const esAdministrador = sesion.esAdministrador;
        let mensaje;
        let entrenadores: EntrenadorEntity[];
        entrenadores = await this._entrenadorService.buscarPorUsuario(Number(sesion.usuarioEntidad.id));
        console.log("GETPARTICIPAR: "+JSON.stringify(entrenadores));

        response.render('confirmarParticipacion',{
            idEvento: idEvento,
            esUsuario: esUsuario,
            esAdministrador: esAdministrador,
            entrenadores: entrenadores,

        })
    }


    @Post('participar/:idEvento')
    @HttpCode(200)
    async participarMetodo(
        @Body() idPokemon,
        @Param('idEvento') idEvento:string,
        @Res() response,
        @Session() sesion
    ) {

        console.log("TTTT: "+idPokemon.entrenador);



        let evento = await this._eventoService.buscarPorId(Number(idEvento));
        let pokemon = await this._pokemonService.buscarPorId(Number(idPokemon.entrenador));
//        let ventaPendiente = await this._ventaService.crear({id: undefined, fechaVenta: fecha,usuario: usuario})
        let eventoPorPokemon = await this._eventoPorPokemonService.crear({id:undefined, evento: evento, pokemon: pokemon});

        response.redirect('/inicio');

    }

    @Get('detalle/:idEvento')
    async detalle(
        @Res() response,
        @Param('idEvento') idEvento: string,
        @Session() sesion,
    ) {

        if(typeof sesion.usuarioEntidad !== 'undefined'){
            let eventoPorPokemon: EventoPorPokemonEntity[];

            eventoPorPokemon = await this._eventoPorPokemonService.buscarBiblioteca(Number(idEvento));
            let evento = await this._eventoService.buscarPorId(Number(idEvento));
            console.log("AQUI ", eventoPorPokemon);
            let entrenadores = await this._entrenadorService.buscar();
            let esUsuario = sesion.esUsuario;
            let esAdministrador = sesion.esAdministrador;
            // console.log("INICIO: "+ esUsuario+"....."+esAdministrador);

            response.render('detalleEvento', {
                nombre: 'Rafael',
                eventoPorPokemon: eventoPorPokemon,
                titulo: 'Evento',
                esUsuario: esUsuario,
                evento: evento,
                entrenadores: entrenadores,
                esAdministrador: esAdministrador
            });
        }else{
            response.render('detalleEvento', {
                nombre: 'Rafael',
                titulo: 'Evento',
            });
        }


    }


}

