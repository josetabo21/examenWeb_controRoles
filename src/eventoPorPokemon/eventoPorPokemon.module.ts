// usuario.module.ts

import {Module} from "@nestjs/common";
import {EventoPorPokemonService} from "./eventoPorPokemon.service";
import {EventoPorPokemonController} from "./eventoPorPokemon.controller";
import {TypeOrmModule} from '@nestjs/typeorm';
import {EventoPorPokemonEntity} from "./eventoPorPokemon.entity";
import {EventoModule} from "../evento/evento.module";


@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    EventoPorPokemonEntity
                ]
            ),
        EventoModule,
    ],
    controllers: [
        EventoPorPokemonController
    ],
    providers: [
        EventoPorPokemonService
    ],
    exports: [
        EventoPorPokemonService
    ]
})
export class EventoPorPokemonModule {
}
