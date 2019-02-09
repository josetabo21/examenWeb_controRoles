// usuario.module.ts

import {Module} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioController} from "./usuario.controller";
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario.entity";
import {RolesPorUsuarioModule} from "../rolesPorUsuario/rolesPorUsuario.module";
import {RolModule} from "../rol/rol.module";
import {EntrenadorModule} from "../entrenador/entrenador.module";
import {PokemonModule} from "../pokemon/pokemon.module";
import {EventoModule} from "../evento/evento.module";
import {EventoPorPokemonModule} from "../eventoPorPokemon/eventoPorPokemon.module";

@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    UsuarioEntity
                ]
            ),
        RolesPorUsuarioModule,
        RolModule,
        EntrenadorModule,
        PokemonModule,
        EventoPorPokemonModule
    ],
    controllers: [
        UsuarioController
    ],
    providers: [
        UsuarioService
    ],
    exports: [
        UsuarioService
    ]
})
export class UsuarioModule {
}
