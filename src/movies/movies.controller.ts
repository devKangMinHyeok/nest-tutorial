import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies') // router 역할
export class MoviesController {
  @Get()
  getAll() {
    return 'this will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `this will return one movie id : ${movieId}`;
  }

  @Post()
  create() {
    return 'this will create a movie';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `this will remove a movie id : ${movieId}`;
  }

  @Patch()
  patch(@Param('id') movieId: string) {
    return `this will patch a movie id : ${movieId}`;
  }
}
