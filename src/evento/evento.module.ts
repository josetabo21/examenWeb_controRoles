// usuario.module.ts

import {Module} from "@nestjs/common";
import {EventoService} from "./evento.service";
import {EventoController} from "./evento.controller";
import {TypeOrmModule} from '@nestjs/typeorm';
import {EventoEntity} from "./evento.entity";


@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    EventoEntity
                ]
            ),
    ],
    controllers: [
        EventoController
    ],
    providers: [
        EventoService
    ],
    exports: [
        EventoService
    ]
})
export class EventoModule {
}
