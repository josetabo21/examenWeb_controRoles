import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {EventoEntity} from "./evento.entity";
import {RolesPorUsuario, RolesPorUsuarioService} from "../rolesPorUsuario/rolesPorUsuario.service";
import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";
import {RolesPorUsuarioEntity} from "../rolesPorUsuario/rolesPorUsuario.entity";


@Injectable()
export class EventoService {
    // Inyectar Dependencias
    constructor(
        @InjectRepository(EventoEntity)
        private readonly eventoRepository: Repository<EventoEntity>,
    ) {
    }

    buscar(parametros?: FindManyOptions<EventoEntity>)
        : Promise<EventoEntity[]> {
        return this.eventoRepository.find(parametros);
    }


    async crear(nuevoEvento: Evento): Promise<EventoEntity> {

        // Instanciar una entidad -> .create()


        const eventoEntity = this.eventoRepository
            .create(nuevoEvento);

        // Guardar una entidad en la BDD -> .save()
        const eventoCreado = await this.eventoRepository
            .save(eventoEntity);

        return eventoCreado;
    }

    actualizar(idEvento: number,
               nuevoEvento: Evento): Promise<EventoEntity> {

        nuevoEvento.id = idEvento;

        const eventoEntity = this.eventoRepository.create(nuevoEvento);

        return this.eventoRepository.save(eventoEntity);
    }

    borrar(idEvento: number): Promise<EventoEntity> {

        // CREA UNA INSTANCIA DE LA ENTIDAD
        const eventoEntityAEliminar = this.eventoRepository
            .create({
                id: idEvento
            });


        return this.eventoRepository.remove(eventoEntityAEliminar)
    }

    buscarPorId(idEvento: number): Promise<EventoEntity> {
        return this.eventoRepository.findOne(idEvento);
    }

}



export interface Evento{
    id: number;
    nombre: string;
    fecha: Date;
    latitud: number,
    longitud: number
}