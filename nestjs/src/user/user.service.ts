import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Tags } from './entities/tags.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Tags) private readonly tags: Repository<Tags>
  ){}
  create(createUserDto: CreateUserDto) {
    const data  = new User()
    data.name = createUserDto.name
    data.desc = createUserDto.desc
    return this.user.save(data)
  }

  async findAll(query: {kw: string, page: number, limit: number}) {
    const data = await this.user.find({
      relations: ['tags'], // 关联tags表
      where: {
        name: Like(`%${query.kw}%`)
      },
      order: {
        id: 'DESC'
      },
      skip: (query.page - 1) * query.limit,
      take: query.limit
    })
    const total = await this.user.count({
      where: {
        name: Like(`%${query.kw}%`)
      }
    })
    return {
      data,
      total
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.user.delete(id)
  }

  async addTags(params: {tags: string[], userId: number}) {
    console.log(params)
    const userInfo = await this.user.findOne({where: {id: params.userId}})
    const tagList: Tags[] = []
    for (let i = 0; i < params.tags.length; i++) {
      const T = new Tags()
      T.name = params.tags[i]
      await this.tags.save(T)
      tagList.push(T)
    }
    userInfo.tags = tagList
    this.user.save(userInfo)
    return true
  }
}
