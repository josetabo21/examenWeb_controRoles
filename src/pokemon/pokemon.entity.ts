// usuario-entity.ts

import {BeforeInsert, Unique, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {EntrenadorEntity} from "../entrenador/entrenador.entity";
import {EventoPorPokemonEntity} from "../eventoPorPokemon/eventoPorPokemon.entity";

@Entity('Pokemon')
export class PokemonEntity {

    @PrimaryGeneratedColumn()
    id: number;
/*
- numeroPokemon (entero)
- nombrePokemon
- poderEspecialUno (string)
- poderEspecialDos (string)
- fechaCaptura
- nivel (entero)
- entrenadorId
*/

    @Index()

    @Column(
        {
            name: 'numeroPokemon',
            type: 'int',
            default: 0
        }
    )
    numeroPokemon: number;

    @Column(
        {
            name: 'nombrePokemon',
            type: 'varchar',
            length: 50,
            default: 'nombrePokemon'
        }
    )
    nombrePokemon: string;

    @Column(
        {
            name: 'poderEspecialUno',
            type: 'varchar',
            length: 50,
            default: 'poderEspecialUno'
        }
    )
    poderEspecialUno: string;

    @Column(
        {
            name: 'poderEspecialDos',
            type: 'varchar',
            length: 50,
            default: 'poderEspecialDos'
        }
    )
    poderEspecialDos: string;

    @Column(
        {
            name: 'fechaCaptura',
            type: 'date'
        }
    )
    fechaCaptura: Date;

    @Column(
        {
            name: 'nivel',
            type: 'int',
            default: 0
        }
    )
    nivel: number;

    @BeforeInsert()
    antesDeInsertar() {
        console.log('Ejecutandome antes de insertar');
    }

    @BeforeInsert()
    verificarFuncion() {
        console.log('Ejecuta despues de antes de insertar');
    }

    @ManyToOne(
        type => EntrenadorEntity, // Tipo relacion de muchos
        // a uno
        entrenador => entrenador.pokemon, // Campo donde nos guarda
        { onDelete: 'CASCADE' }
    )
    entrenador: EntrenadorEntity;

    @OneToMany(
        type => EventoPorPokemonEntity, // Tipo de Dato Un Usuario a muchos
        // Libros[]
        eventoPorPokemon => eventoPorPokemon.pokemon // Cual es el campo FK
    )
    eventoPorPokemon: EventoPorPokemonEntity[];


}