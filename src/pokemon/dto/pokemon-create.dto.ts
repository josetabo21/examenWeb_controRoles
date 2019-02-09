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

export class PokemonCreateDto {

    @IsInt({
        message: "NUMERO: debe ser numero"
    })
    @Min(1, {
        message: "NUMERO: debe ser mayor a cero"
    })
    numeroPokemon:number;

    @IsNotEmpty({
        message: "NOMBRE: no puede dejar vacío"
    })
    @IsString()
    @Length(3,50,{
        message: "NOMBRE: muy corto"
    })
    @Matches(/^[a-zA-Z\s]+$/,{
        message: "NOMBRE: Solo se permiten letras y espacios"
    })
    nombrePokemon:string;


    @IsNotEmpty({
        message: "PODER 1: no puede dejar vacío"
    })
    @IsString()
    @Length(3,50,{
        message: "PODER 1: muy corto"
    })
    @Matches(/^[a-zA-Z\s]+$/,{
        message: "PODER 1: Solo se permiten letras y espacios"
    })
    poderEspecialUno:string;

    @IsNotEmpty({
        message: "PODER 2: no puede dejar vacío"
    })
    @IsString()
    @Length(3,50,{
        message: "PODER 2: muy corto"
    })
    @Matches(/^[a-zA-Z\s]+$/,{
        message: "PODER 2: Solo se permiten letras y espacios"
    })
    poderEspecialDos:string;

    @IsNotEmpty({
        message: "FECHA: debe ingresar una fecha"
    })
    @IsDate({
        message: "FECHA: debe ingresar una fecha válida"
    })
    fechaCaptura:Date;

    @IsNotEmpty({
        message: "NIVEL: no puede dejar vacío"
    })
    @IsInt({
        message: "NIVEL: debe ser numero"
    })
    @Min(0, {
        message: "NIVEL: debe ser mayor o igual a cero"
    })
    nivel:number;

}