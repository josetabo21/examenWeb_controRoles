import {Injectable} from "@nestjs/common";
import {Repository, createQueryBuilder, IsNull} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {EventoPorPokemonEntity} from "./eventoPorPokemon.entity";
import {EventoEntity} from "../evento/evento.entity";

import {EntrenadorEntity} from "../entrenador/entrenador.entity";



@Injectable()
export class EventoPorPokemonService {
    constructor(
        @InjectRepository(EventoPorPokemonEntity)
        private readonly eventoPorPokemonEntity: Repository<EventoPorPokemonEntity>,
    ) {
    }

    async crear(nuevoEventoPorPokemon: EventoPorPokemonEntity): Promise<EventoPorPokemonEntity> {

        // Instanciar una entidad -> .create()

        // const existe = this._rolesPorUsuarioRepository.findAndCount({where:[rol=nuevoRol.rol, usuario=nuevoRol.usuario]})
        const eventoPorPokemonEntity = this.eventoPorPokemonEntity
            .create(nuevoEventoPorPokemon);


        // Guardar una entidad en la BDD -> .save()
        const eventoPorPokemonCreado = await this.eventoPorPokemonEntity
            .save(eventoPorPokemonEntity);

        return eventoPorPokemonCreado;
    }

    confirmarVenta(eventoPorPokemon: EventoPorPokemonEntity) {


        const eventoPorPokemonEntity = this.eventoPorPokemonEntity.create(eventoPorPokemon);
        this.eventoPorPokemonEntity.save(eventoPorPokemonEntity);
    }

    async buscar(): Promise<EventoPorPokemonEntity[]> {
        return this.eventoPorPokemonEntity.find(
            {
                relations: ["venta","videojuego"],
                where: { venta: IsNull()} }
        );
    }

    async buscarBiblioteca(idEvento: number): Promise<EventoPorPokemonEntity[]> {
        return this.eventoPorPokemonEntity.find(
            {
                relations: ["pokemon"],
                where: { "evento": idEvento},
                }
        );
    }

    borrar(idEventoPorPokemon: number): Promise<EventoPorPokemonEntity> {

        // CREA UNA INSTANCIA DE LA ENTIDAD
        const EventoPorPokemonEntityAEliminar = this.eventoPorPokemonEntity
            .create({
                id: idEventoPorPokemon
            });


        return this.eventoPorPokemonEntity.remove(EventoPorPokemonEntityAEliminar);
    }
    async buscarPorId(idEventoPorPokemon: number): Promise<EventoPorPokemonEntity> {
        return this.eventoPorPokemonEntity.findOne(idEventoPorPokemon);
    }



}



export interface EventoPorPokemon {
    id: number;
    entrenador: EntrenadorEntity,
    evento: EventoEntity;
}
