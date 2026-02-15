import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { IngressosService } from './ingressos.service';

@Controller('ingressos')
export class IngressosController {
    constructor(private readonly ingressosService: IngressosService) { }

    @Get()
    findAll(@Query('sessaoId') sessaoId?: string) {
        return this.ingressosService.findAll(sessaoId);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.ingressosService.findOne(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.ingressosService.create(body);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.ingressosService.remove(id);
    }
}
