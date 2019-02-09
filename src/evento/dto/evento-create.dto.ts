// usuario-crate.dto.ts

import {
    IsAlpha,
    IsDate,
    IsDateString,
    IsEmail,
    IsEmpty, IsInt,
    IsNotEmpty, IsNumber, IsNumberOptions,
    IsNumberString,
    IsString, IsUrl,
    Length,
    Matches, Min
} from "class-validator";

export class EventoCreateDto {

    @IsNotEmpty({
        message: "NOMBRE: no puede dejar vacío"
    })
    @IsString()
    // @IsAlpha()
    @Length(3,50,{
        message: "NOMBRE: muy corto"
    })
    @Matches(/^[0-9A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\.:'\s\-",!¡¿?%&]+$/,{
        message: "NOMBRE: caracter especial no válido "
    })
    nombre:string;


    @IsNotEmpty({
        message: "FECHA: debe ingresar una fecha"
    })
    @IsDate({
        message: "FECHA: debe ingresar una fecha válida"
    })
    fecha:Date;


    @IsNotEmpty({
        message: "LATITUD: no puede dejar vacío"
    })
    @IsNumber({},{
        message: "LONGITUD: debe ser numero"
    })

    latitud:number;

    @IsNotEmpty({
        message: "LONGITUD: no puede dejar vacío"
    })
    @IsNumber({},{
        message: "LONGITUD: debe ser numero"
    })
    longitud:number;


}