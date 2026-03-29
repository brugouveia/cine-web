import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SalasService } from './salas.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';

@Controller('salas')
export class SalasController {
    constructor(private readonly salasService: SalasService) {}

    @Post()
    create(@Body() createSalaDto: CreateSalaDto) {
        return this.salasService.create(createSalaDto);
    }

    @Get()
    findAll() {
        return this.salasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.salasService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSalaDto: UpdateSalaDto) {
        return this.salasService.update(id, updateSalaDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.salasService.remove(id);
    }
}
