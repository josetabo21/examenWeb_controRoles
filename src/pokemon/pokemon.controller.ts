import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Pokemon, PokemonService} from "./pokemon.service";
import {PokemonEntity} from "./pokemon.entity";
import {EntrenadorEntity} from "../entrenador/entrenador.entity";
import {Like} from "typeorm";
import {validate, ValidationError} from "class-validator";
import {Entrenador, EntrenadorService} from "../entrenador/entrenador.service";
import {PokemonCreateDto} from "../pokemon/dto/pokemon-create.dto";

@Controller('Pokemon')
export class PokemonController {

    constructor(
        private readonly _pokemonService: PokemonService,
    ) {

    }


}
