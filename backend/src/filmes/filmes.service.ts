import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FilmesService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.filme.findMany();
    }

    findOne(id: number) {
        return this.prisma.filme.findUnique({ where: { id } });
    }

    create(data: Prisma.FilmeCreateInput) {
        return this.prisma.filme.create({ data });
    }

    update(id: number, data: Prisma.FilmeUpdateInput) {
        return this.prisma.filme.update({ where: { id }, data });
    }

    remove(id: number) {
        return this.prisma.filme.delete({ where: { id } });
    }
}
