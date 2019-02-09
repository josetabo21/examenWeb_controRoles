// libro.entity.ts

import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EventoEntity} from "../evento/evento.entity";
import {PokemonEntity} from "../pokemon/pokemon.entity";

@Entity('EventoPorPokemon')
export class EventoPorPokemonEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => PokemonEntity, // Tipo relacion de muchos
        // a uno
        pokemon => pokemon.eventoPorPokemon, // Campo donde nos guarda
        { onDelete: 'CASCADE' }
    )
    pokemon: PokemonEntity;
    @ManyToOne(
        type => EventoEntity, // Tipo relacion de muchos
        // a uno
        evento => evento.eventoPorPokemon, // Campo donde nos guarda
        { onDelete: 'CASCADE' }
    )
    evento: EventoEntity;
}
