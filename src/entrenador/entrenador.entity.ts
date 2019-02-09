// usuario-entity.ts

import {BeforeInsert, Unique, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {PokemonEntity} from "../pokemon/pokemon.entity";

@Entity('Entrenador')
export class EntrenadorEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column(
        {
            name: 'nombres',
            type: 'varchar',
            length: 50,
            default: 'nombres'
        }
    )
    nombres: string;

    @Column(
        {
            name: 'apellidos',
            type: 'varchar',
            length: 50,
            default: 'apellidos'
        }
    )
    apellidos: string;

    @Column(
        {
            name: 'fechaNacimiento',
            type: 'date'
        }
    )
    fechaNacimiento: Date;

    @Column(
        {
            name: 'numeroMedallas',
            type: 'int',
            default: 0
        }
    )
    numeroMedallas: number;

    @Column(
        {
            name: 'campeonActual',
            type: 'boolean',
            default: false
        }
    )
    campeonActual: boolean;



    @BeforeInsert()
    antesDeInsertar() {
        console.log('Ejecutandome antes de insertar');
    }

    @BeforeInsert()
    verificarFuncion() {
        console.log('Ejecuta despues de antes de insertar');
    }

    @ManyToOne(
        type => UsuarioEntity, // Tipo relacion de muchos
        // a uno
        usuario => usuario.entrenador, // Campo donde nos guarda
        { onDelete: 'CASCADE' }
    )
    usuario: UsuarioEntity;

    @OneToMany(
        type => PokemonEntity, // Tipo de Dato Un Usuario a muchos
        // Libros[]
        pokemon => pokemon.entrenador // Cual es el campo FK
    )
    pokemon: PokemonEntity[];


}