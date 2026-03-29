import { IsNumber, IsString, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSalaDto {
    @ApiProperty({ example: 101 })
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    numero: number;

    @ApiProperty({ example: 50 })
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    capacidade: number;

    @ApiProperty({ example: '3D' })
    @IsString()
    @IsNotEmpty()
    tipo: string;
}
