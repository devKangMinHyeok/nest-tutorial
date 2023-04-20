import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

describe('movies service', () => {
  let service: MoviesService;

  beforeEach(async () => {
    // test module을 만들고, service 클래스를 전달하여, 해당 클래스의 인스턴스를 test module에 등록한다.
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    // test module에서 service 클래스의 인스턴스를 초기화한다.
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'test1',
        year: 2022,
        genres: ['test'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.create({
        title: 'test1',
        year: 2022,
        genres: ['test'],
      });

      const allMovies = service.getAll();
      const completed = service.deleteOne(1);

      expect(completed).toEqual(true);

      const afterMovies = service.getAll();

      expect(afterMovies.length).toEqual(allMovies.length - 1);
      expect(afterMovies).toEqual([]);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(0);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID 0 not found.');
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeMoviesLength = service.getAll().length;
      service.create({
        title: 'test1',
        year: 2022,
        genres: ['test'],
      });

      const afterMoviesLength = service.getAll().length;

      expect(beforeMoviesLength).toEqual(afterMoviesLength - 1);

      const movie = service.getOne(1);

      expect(movie).toEqual({
        id: 1,
        title: 'test1',
        year: 2022,
        genres: ['test'],
      });
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'test1',
        year: 2022,
        genres: ['test'],
      });

      service.update(1, { title: 'test2' });

      const afterMovie = service.getOne(1);

      expect(afterMovie).toEqual({
        id: 1,
        title: 'test2',
        year: 2022,
        genres: ['test'],
      });
    });

    it('should return a 404', () => {
      try {
        service.update(0, { title: 'test2' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID 0 not found.');
      }
    });
  });
});
