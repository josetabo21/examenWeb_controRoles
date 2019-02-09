// usuario-entity.ts

import {BeforeInsert, Unique, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {EventoPorPokemonEntity} from "../eventoPorPokemon/eventoPorPokemon.entity";


@Entity('Evento')
export class EventoEntity {

    @PrimaryGeneratedColumn()
    id: number;
    /*
    - nombre
    - fecha
    - latitud
    - longitud
    */

    @Index()

    @Column(
        {
            name: 'nombre',
            type: 'varchar',
            length: 50,
            default: 'nombre'
        }
    )
    nombre: string;

    @Column(
        {
            name: 'fecha',
            type: 'date'
        }
    )
    fecha: Date;

    @Column(
        {
            name: 'latitud',
            type: 'float',
            default: 0
        }
    )
    latitud: number;
    @Column(
        {
            name: 'longitud',
            type: 'float',
            default: 0
        }
    )
    longitud: number;

    @BeforeInsert()
    antesDeInsertar() {
        console.log('Ejecutandome antes de insertar');
    }

    @BeforeInsert()
    verificarFuncion() {
        console.log('Ejecuta despues de antes de insertar');
    }

    @OneToMany(
        type => EventoPorPokemonEntity, // Tipo de Dato Un Usuario a muchos
        // Libros[]
        eventoPorPokemon => eventoPorPokemon.evento // Cual es el campo FK
    )
    eventoPorPokemon: EventoPorPokemonEntity[];
}