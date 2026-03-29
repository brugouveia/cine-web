import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateSessaoDto {
    @ApiProperty({ example: '2026-03-29T14:00:00Z', format: 'date-time' })
    @IsString()
    @IsNotEmpty()
    horarioExibicao: string;

    @ApiProperty({ example: 1 })
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    filmeId: number;

    @ApiProperty({ example: 1 })
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    salaId: number;
}
