import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    ParseIntPipe,
    Put,
} from '@nestjs/common';
import { SalasService } from './salas.service';

@Controller('salas')
export class SalasController {
    constructor(private readonly salasService: SalasService) { }

    @Get()
    findAll() {
        return this.salasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.salasService.findOne(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.salasService.create(body);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        return this.salasService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.salasService.remove(id);
    }
}
