import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString, Min, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFilmeDto {
    @ApiProperty({ example: 'O Poderoso Chefão' })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(255)
    titulo: string;

    @ApiProperty({ example: 'A história de uma família mafiosa...' })
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    sinopse: string;

    @ApiProperty({ example: '16 anos' })
    @IsString()
    @IsNotEmpty()
    classificacao: string;

    @ApiProperty({ example: 175 })
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    duracao: number;

    @ApiPropertyOptional({ example: 'Marlon Brando, Al Pacino' })
    @IsString()
    @IsOptional()
    elenco?: string;

    @ApiProperty({ example: 'Drama' })
    @IsString()
    @IsNotEmpty()
    genero: string;

    @ApiProperty({ example: '2024-01-01', format: 'date' })
    @IsDateString()
    @IsNotEmpty()
    dataInicioExibicao: string;

    @ApiProperty({ example: '2024-12-31', format: 'date' })
    @IsDateString()
    @IsNotEmpty()
    dataFinalExibicao: string;
}
