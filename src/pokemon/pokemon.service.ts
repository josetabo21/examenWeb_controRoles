import {Injectable} from "@nestjs/common";
import {Repository,createQueryBuilder} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {PokemonEntity} from "./pokemon.entity";
import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";
import {Entrenador} from "../entrenador/entrenador.service";
import {EntrenadorEntity} from "../entrenador/entrenador.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {Usuario} from "../usuario/usuario.service";



@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(PokemonEntity)
        private readonly _pokemonRepository: Repository<PokemonEntity>,
    ) {
    }

    async buscar(parametros?: FindManyOptions<PokemonEntity>): Promise<PokemonEntity[]> {
        return this._pokemonRepository.find(parametros);
    }

    async buscarPorId(idPokemon: number): Promise<PokemonEntity> {
        return this._pokemonRepository.findOne(idPokemon);
    }

    async crear(nuevoPokemon: Pokemon): Promise<PokemonEntity> {

        // Instanciar una entidad -> .create()


        const pokemonEntity = this._pokemonRepository
            .create(nuevoPokemon);

        // Guardar una entidad en la BDD -> .save()
        const pokemonCreado = await this._pokemonRepository
            .save(pokemonEntity);

        return pokemonCreado;
    }

}



export interface Pokemon {
    id: number;
    numeroPokemon: number;
    nombrePokemon: string;
    poderEspecialUno: string;
    poderEspecialDos: string;
    fechaCaptura: Date;
    nivel: number;
    entrenador: EntrenadorEntity;
}
