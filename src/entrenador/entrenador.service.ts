import {Body, Injectable, Post, Res} from "@nestjs/common";
import {Repository,createQueryBuilder} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {EntrenadorEntity} from "./entrenador.entity";
import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";
import {RolesPorUsuarioEntity} from "../rolesPorUsuario/rolesPorUsuario.entity";
import {Usuario} from "../usuario/usuario.service";
import {Entrenador} from "../entrenador/entrenador.service";
import {validate, ValidationError} from "class-validator";
import {EntrenadorCreateDto} from "./dto/entrenador-create.dto";
import {UsuarioEntity} from "../usuario/usuario.entity";


@Injectable()
export class EntrenadorService {
    constructor(
        @InjectRepository(EntrenadorEntity)
        private readonly _entrenadorRepository: Repository<EntrenadorEntity>,
    ) {
    }

     buscar(parametros?: FindManyOptions<EntrenadorEntity>): Promise<EntrenadorEntity[]> {
        return this._entrenadorRepository.find(parametros);
    }

    async buscarPorId(idEntrenador: number): Promise<EntrenadorEntity> {
        return this._entrenadorRepository.findOne(idEntrenador);
    }

    async buscarPorUsuario(idUsuario: number): Promise<EntrenadorEntity[]> {
        return this._entrenadorRepository.find({
            relations: ["usuario", "pokemon"],
            where: {"usuario":idUsuario}
        });
    }


    async crear(nuevoEntrenador: Entrenador): Promise<EntrenadorEntity> {

        // Instanciar una entidad -> .create()


        const entrenadorEntity = this._entrenadorRepository
            .create(nuevoEntrenador);

        // Guardar una entidad en la BDD -> .save()
        const entrenadorCreado = await this._entrenadorRepository
            .save(entrenadorEntity);

        return entrenadorCreado;
    }

    async existeCampeon (): Promise<boolean>{

        const existe = this._entrenadorRepository.count({where: {campeonActual: true} });
        return existe.then((n)=>{
            if(n>0){
                return true;
            }else{
                return false;
            }
        })
    }

}



export interface Entrenador {
    id: number;
    nombres: string;
    apellidos: string;
    fechaNacimiento: Date;
    numeroMedallas: number;
    campeonActual: boolean;
    usuario: UsuarioEntity
}
