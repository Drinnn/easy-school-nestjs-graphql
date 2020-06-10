import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsInput {
  @Field(type => ID)
  @IsUUID('all')
  lessonId: string;

  @Field(type => [ID])
  @IsUUID('all', { each: true })
  studentIds: string[];
}
