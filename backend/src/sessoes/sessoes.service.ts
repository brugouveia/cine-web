import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';

@Injectable()
export class SessoesService {
    constructor(private prisma: PrismaService) {}

    create(createSessaoDto: CreateSessaoDto) {
        return this.prisma.sessao.create({
            data: {
                horarioExibicao: createSessaoDto.horarioExibicao,
                filmeId: Number(createSessaoDto.filmeId),
                salaId: Number(createSessaoDto.salaId),
            },
            include: { filme: true, sala: true },
        });
    }

    findAll() {
        return this.prisma.sessao.findMany({
            include: { filme: true, sala: true },
        });
    }

    findOne(id: number) {
        return this.prisma.sessao.findUnique({
            where: { id },
            include: { filme: true, sala: true },
        });
    }

    update(id: number, updateSessaoDto: UpdateSessaoDto) {
        return this.prisma.sessao.update({
            where: { id },
            data: {
                horarioExibicao: updateSessaoDto.horarioExibicao,
                filmeId: updateSessaoDto.filmeId && Number(updateSessaoDto.filmeId),
                salaId: updateSessaoDto.salaId && Number(updateSessaoDto.salaId),
            },
            include: { filme: true, sala: true },
        });
    }

    remove(id: number) {
        return this.prisma.sessao.delete({ where: { id } });
    }
}
