import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  password: string

  @Column()
  age: number
}
