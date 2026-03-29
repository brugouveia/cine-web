import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { SessoesService } from './sessoes.service';

@Controller('sessoes')
export class SessoesController {
    constructor(private readonly sessoesService: SessoesService) {}

    @Get()
    findAll() {
        return this.sessoesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.sessoesService.findOne(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.sessoesService.create(body);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.sessoesService.remove(id);
    }
}
