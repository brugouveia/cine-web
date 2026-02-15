import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IngressosService {
    constructor(private prisma: PrismaService) { }

    findAll(sessaoId?: string) {
        const where = sessaoId ? { sessaoId: Number(sessaoId) } : {};
        return this.prisma.ingresso.findMany({ where });
    }

    findOne(id: number) {
        return this.prisma.ingresso.findUnique({ where: { id } });
    }

    create(data: {
        sessaoId: string | number;
        valorInteira: number;
        valorMeia: number;
        tipo?: string;
    }) {
        return this.prisma.ingresso.create({
            data: {
                valorInteira: data.valorInteira,
                valorMeia: data.valorMeia,
                tipo: data.tipo,
                sessao: { connect: { id: Number(data.sessaoId) } },
            },
        });
    }

    remove(id: number) {
        return this.prisma.ingresso.delete({ where: { id } });
    }
}
