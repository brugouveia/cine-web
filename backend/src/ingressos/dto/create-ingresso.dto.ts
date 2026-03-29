import { IsNumber, IsPositive, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TipoIngresso } from '../enums/tipo-ingresso.enum';

export class CreateIngressoDto {
    @ApiProperty({ example: 1 })
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    sessaoId: number;

    @ApiProperty({ example: 30.0 })
    @IsNumber()
    @IsPositive()
    valorInteira: number;

    @ApiProperty({ example: 15.0 })
    @IsNumber()
    @IsPositive()
    valorMeia: number;

    @ApiPropertyOptional({ enum: TipoIngresso, example: TipoIngresso.INTEIRA })
    @IsEnum(TipoIngresso)
    @IsOptional()
    tipo?: TipoIngresso;
}
