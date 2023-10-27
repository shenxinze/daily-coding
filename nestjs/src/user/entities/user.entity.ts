import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Tags } from './tags.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  desc: string

  @OneToMany(() => Tags, tags => tags.user)
  tags: Tags[]
}