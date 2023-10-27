import { Injectable } from '@nestjs/common';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';
import axios from 'axios'
import * as cheerio from 'cheerio';
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class SpiderService {
  // create(createSpiderDto: CreateSpiderDto) {
  //   return 'This action adds a new spider';
  // }

  // findAll() {
  //   return `This action returns all spider`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} spider`;
  // }

  // update(id: number, updateSpiderDto: UpdateSpiderDto) {
  //   return `This action updates a #${id} spider`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} spider`;
  // }


  async findAll() {
    const urls: string[] = []
    const baseUrl = 'https://www.xgmn01.com'
    let index = 0
    const downImg = async () => {
      console.log(`第${index ? index : 1}页`)
      const body = await axios.get(`https://www.xgmn01.com/Xiuren/Xiuren25156${index ? '_' + index : ''}.html`).then(async res => res.data)
      // console.log('body', body)
      const $ = cheerio.load(body)
      const page = $('.pagination').eq(0).find('a')
      const pageList = page.map(function(){
        return $(this).text()
      }).toArray()

      if(pageList.at(-1) === '下一页'){
        $('.article-content p img').each(function(){
          urls.push(baseUrl + $(this).attr('src'))
        })
        index++
        await downImg()
      }
    }
    await downImg()
    console.log(urls)
    this.writeFile(urls)
    return 'downImg'
  }

  writeFile(urls: string[]){
    urls.forEach(async url => {
      const buffer = await axios.get(url, { responseType: 'arraybuffer'}).then(res => res.data)
      const ws = fs.createWriteStream(path.join(__dirname, '../model' + new Date().getTime() + '.jpg'))
      ws.write(buffer)
    })
  }
}
