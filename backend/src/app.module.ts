import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { FilmesModule } from './filmes/filmes.module';
import { SalasModule } from './salas/salas.module';
import { SessoesModule } from './sessoes/sessoes.module';
import { IngressosModule } from './ingressos/ingressos.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [() => ({ databaseUrl: process.env.DATABASE_URL })],
        }),
        PrismaModule,
        FilmesModule,
        SalasModule,
        SessoesModule,
        IngressosModule,
    ],
})
export class AppModule {}
