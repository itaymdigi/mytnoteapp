/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { NoteService } from "../note.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { NoteCreateInput } from "./NoteCreateInput";
import { Note } from "./Note";
import { NoteFindManyArgs } from "./NoteFindManyArgs";
import { NoteWhereUniqueInput } from "./NoteWhereUniqueInput";
import { NoteUpdateInput } from "./NoteUpdateInput";
import { CreateNoteInput } from "../CreateNoteInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class NoteControllerBase {
  constructor(
    protected readonly service: NoteService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Note })
  @nestAccessControl.UseRoles({
    resource: "Note",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createNote(@common.Body() data: NoteCreateInput): Promise<Note> {
    return await this.service.createNote({
      data: {
        ...data,

        notebook: data.notebook
          ? {
              connect: data.notebook,
            }
          : undefined,
      },
      select: {
        content: true,
        createdAt: true,
        id: true,

        notebook: {
          select: {
            id: true,
          },
        },

        title: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Note] })
  @ApiNestedQuery(NoteFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Note",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async notes(@common.Req() request: Request): Promise<Note[]> {
    const args = plainToClass(NoteFindManyArgs, request.query);
    return this.service.notes({
      ...args,
      select: {
        content: true,
        createdAt: true,
        id: true,

        notebook: {
          select: {
            id: true,
          },
        },

        title: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Note })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Note",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async note(
    @common.Param() params: NoteWhereUniqueInput
  ): Promise<Note | null> {
    const result = await this.service.note({
      where: params,
      select: {
        content: true,
        createdAt: true,
        id: true,

        notebook: {
          select: {
            id: true,
          },
        },

        title: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Note })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Note",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateNote(
    @common.Param() params: NoteWhereUniqueInput,
    @common.Body() data: NoteUpdateInput
  ): Promise<Note | null> {
    try {
      return await this.service.updateNote({
        where: params,
        data: {
          ...data,

          notebook: data.notebook
            ? {
                connect: data.notebook,
              }
            : undefined,
        },
        select: {
          content: true,
          createdAt: true,
          id: true,

          notebook: {
            select: {
              id: true,
            },
          },

          title: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Note })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Note",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteNote(
    @common.Param() params: NoteWhereUniqueInput
  ): Promise<Note | null> {
    try {
      return await this.service.deleteNote({
        where: params,
        select: {
          content: true,
          createdAt: true,
          id: true,

          notebook: {
            select: {
              id: true,
            },
          },

          title: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Post("/note-ai")
  @swagger.ApiOkResponse({
    type: CreateNoteInput,
  })
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async CreateNoteWithAi(
    @common.Body()
    body: CreateNoteInput
  ): Promise<CreateNoteInput> {
    return this.service.CreateNoteWithAi(body);
  }
}
