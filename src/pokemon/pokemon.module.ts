// usuario.module.ts

import {Module} from "@nestjs/common";
import {PokemonService} from "./pokemon.service";
import {PokemonController} from "./pokemon.controller";
import {TypeOrmModule} from '@nestjs/typeorm';
import {PokemonEntity} from "./pokemon.entity";


@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    PokemonEntity
                ]
            ),
    ],
    controllers: [
        PokemonController
    ],
    providers: [
        PokemonService
    ],
    exports: [
        PokemonService
    ]
})
export class PokemonModule {
}
