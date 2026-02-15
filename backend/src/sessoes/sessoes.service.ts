import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessoesService {
    constructor(private prisma: PrismaService) { }

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

    create(data: { horarioExibicao: string; filmeId: number; salaId: number }) {
        return this.prisma.sessao.create({
            data: {
                horarioExibicao: data.horarioExibicao,
                filme: { connect: { id: Number(data.filmeId) } },
                sala: { connect: { id: Number(data.salaId) } },
            },
            include: { filme: true, sala: true },
        });
    }

    remove(id: number) {
        return this.prisma.sessao.delete({ where: { id } });
    }
}
