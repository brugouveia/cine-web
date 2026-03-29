import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { IngressosService } from './ingressos.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('ingressos')
@Controller('ingressos')
export class IngressosController {
    constructor(private readonly ingressosService: IngressosService) {}

    @Post()
    create(@Body() createIngressoDto: CreateIngressoDto) {
        return this.ingressosService.create(createIngressoDto);
    }

    @Get()
    @ApiQuery({ name: 'sessaoId', required: false })
    findAll(@Query('sessaoId') sessaoId?: string) {
        return this.ingressosService.findAll(sessaoId);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.ingressosService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateIngressoDto: UpdateIngressoDto) {
        return this.ingressosService.update(id, updateIngressoDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.ingressosService.remove(id);
    }
}
