import { Injectable } from '@nestjs/common';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './student.input';
import { uuid } from 'uuidv4';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  public async create(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;

    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return await this.studentRepository.save(student);
  }

  public async get(id: string): Promise<Student> {
    return await this.studentRepository.findOne({ id });
  }

  public async getAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  public async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return await this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
