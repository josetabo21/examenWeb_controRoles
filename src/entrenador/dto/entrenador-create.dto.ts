// usuario-crate.dto.ts

import {
    IsAlpha, IsBoolean,
    IsDate,
    IsDateString,
    IsEmail,
    IsEmpty, IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    Matches, Min
} from "class-validator";

export class EntrenadorCreateDto {

    @IsNotEmpty({
        message: "NOMBRES: no puede dejar vacío"
    })
    @IsString()
    @Length(3,50,{
        message: "NOMBRES: muy corto"
    })
    @Matches(/^[a-zA-Z\s]+$/,{
        message: "NOMBRES: Solo se permiten letras y espacios"
    })
    nombres:string;


    @IsNotEmpty({
        message: "APELLIDOS: no puede dejar vacío"
    })
    @IsString()
    @Length(3,50,{
        message: "APELLIDOS: muy corto"
    })
    @Matches(/^[a-zA-Z\s]+$/,{
        message: "APELLIDOS: Solo se permiten letras y espacios"
    })
    apellidos:string;

    @IsNotEmpty({
        message: "FECHA: debe ingresar una fecha"
    })
    @IsDate({
        message: "FECHA: debe ingresar una fecha válida"
    })
    fechaNacimiento:Date;

    @IsNotEmpty({
        message: "MEDALLAS: no puede dejar vacío"
    })
    @IsInt({
        message: "MEDALLAS: debe ser numero"
    })
    @Min(0, {
        message: "MEDALLAS: debe ser mayor o igual a cero"
    })
    numeroMedallas:number;

    @IsBoolean()
    campeonActual: boolean;
}