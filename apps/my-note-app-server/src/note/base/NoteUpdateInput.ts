/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  MaxLength,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { NotebookWhereUniqueInput } from "../../notebook/base/NotebookWhereUniqueInput";
import { Type } from "class-transformer";

@InputType()
class NoteUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  content?: string | null;

  @ApiProperty({
    required: false,
    type: () => NotebookWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => NotebookWhereUniqueInput)
  @IsOptional()
  @Field(() => NotebookWhereUniqueInput, {
    nullable: true,
  })
  notebook?: NotebookWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  title?: string | null;
}

export { NoteUpdateInput as NoteUpdateInput };
