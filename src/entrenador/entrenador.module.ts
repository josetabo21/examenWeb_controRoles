// usuario.module.ts

import {Module} from "@nestjs/common";
import {EntrenadorService} from "./entrenador.service";
import {EntrenadorController} from "./entrenador.controller";
import {TypeOrmModule} from '@nestjs/typeorm';
import {EntrenadorEntity} from "./entrenador.entity";
import {EventoPorPokemonModule} from "../eventoPorPokemon/eventoPorPokemon.module";
import {EventoModule} from "../evento/evento.module";
import {PokemonModule} from "../pokemon/pokemon.module";


@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    EntrenadorEntity
                ]
            ),
        EventoPorPokemonModule,
        EventoModule,
        PokemonModule,

    ],
    controllers: [
        EntrenadorController
    ],
    providers: [
        EntrenadorService
    ],
    exports: [
        EntrenadorService
    ]
})
export class EntrenadorModule {
}
