import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';

@Injectable()
export class IngressosService {
    constructor(private prisma: PrismaService) {}

    create(createIngressoDto: CreateIngressoDto) {
        return this.prisma.ingresso.create({
            data: {
                valorInteira: createIngressoDto.valorInteira,
                valorMeia: createIngressoDto.valorMeia,
                tipo: createIngressoDto.tipo,
                sessaoId: Number(createIngressoDto.sessaoId),
            },
        });
    }

    findAll(sessaoId?: string) {
        const where = sessaoId ? { sessaoId: Number(sessaoId) } : {};
        return this.prisma.ingresso.findMany({ where });
    }

    findOne(id: number) {
        return this.prisma.ingresso.findUnique({ where: { id } });
    }

    update(id: number, updateIngressoDto: UpdateIngressoDto) {
        return this.prisma.ingresso.update({
            where: { id },
            data: {
                valorInteira: updateIngressoDto.valorInteira,
                valorMeia: updateIngressoDto.valorMeia,
                tipo: updateIngressoDto.tipo,
                sessaoId: updateIngressoDto.sessaoId && Number(updateIngressoDto.sessaoId),
            },
        });
    }

    remove(id: number) {
        return this.prisma.ingresso.delete({ where: { id } });
    }
}
