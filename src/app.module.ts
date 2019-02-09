import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario/usuario.entity";
import {RolesPorUsuarioEntity} from "./rolesPorUsuario/rolesPorUsuario.entity";
import {RolEntity} from "./rol/rol.entity";
import {RolesPorUsuarioModule} from "./rolesPorUsuario/rolesPorUsuario.module";
import {EntrenadorEntity} from "./entrenador/entrenador.entity";
import {PokemonEntity} from "./pokemon/pokemon.entity";
import {EventoEntity} from "./evento/evento.entity";
import {EventoPorPokemonEntity} from "./eventoPorPokemon/eventoPorPokemon.entity";
import {EventoModule} from "./evento/evento.module";


@Module({
    imports: [
        TypeOrmModule
            .forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'rafael',
                password: 'rafael123',
                database: 'examen',
                synchronize: false,
                dropSchema: false,
                entities: [
                    UsuarioEntity,
                    RolEntity,
                    RolesPorUsuarioEntity,
                    EntrenadorEntity,
                    PokemonEntity,
                    EventoEntity,
                    EventoPorPokemonEntity
                ]
            }),
        UsuarioModule,
        RolesPorUsuarioModule,
        EventoModule
    ], // Modulos
    controllers: [AppController], // Controllers
    providers: [
        AppService
    ], // Servicios
})
export class AppModule {
}
