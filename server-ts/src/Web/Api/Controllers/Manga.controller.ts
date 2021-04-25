import { IMangaModel } from 'Data/Models/Manga.model';
import { MangaMapper } from './../../../Config/Mappers/Manga.mapper.dto';
import { BaseHttpController } from './../../Lib/BaseHttp.controller';
import { IMangaService } from 'Core/Ports/IManga.service';
import { Request, Response } from 'express';
import { ResponseDailyDto } from 'Core/Dtos/Manga/Manga.dtos';

export interface IMangaControllerOptions {
  mangaService: IMangaService;
}
export class MangaController extends BaseHttpController {
  private readonly _mangaService: IMangaService;
  constructor({ mangaService }: IMangaControllerOptions) {
    super();

    this._mangaService = mangaService;
  }

  async daily(req: Request, res: Response) {
    const requestData = MangaMapper.toDailyRequestDto(req);
    const daily = await this._mangaService.getDaily(requestData);
    const manga = MangaMapper.toDailyResponseDto(daily);
    this.toJson<ResponseDailyDto>(res, { statusCode: 200, data: manga });
  }
  async find(req: Request, res: Response) {
    const manga = await this._mangaService.find(req.params.id);
    this.toJson<IMangaModel>(res, { data: manga });
  }
  async like(req: Request, res: Response) {
    const data = MangaMapper.toLikeRequestDto({
      ...req,
      status: true,
      id: Number(req.params.id),
    });
    await this._mangaService.setLikeStatus(data);
    res.sendStatus(200);
  }
  async unlike(req: Request, res: Response) {
    const data = MangaMapper.toLikeRequestDto({
      ...req,
      status: false,
      id: Number(req.params.id),
    });
    await this._mangaService.setLikeStatus(data);
    res.sendStatus(200);
  }
  async likeStatus(req: Request, res: Response) {
    return true;
  }
}
