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
import { FilmesService } from './filmes.service';

@Controller('filmes')
export class FilmesController {
    constructor(private readonly filmesService: FilmesService) { }

    @Get()
    findAll() {
        return this.filmesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.filmesService.findOne(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.filmesService.create(body);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        return this.filmesService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.filmesService.remove(id);
    }
}
