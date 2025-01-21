import { PrismaClient } from "@prisma/client";
import { CreateClassInput } from "./dto/create_class.input";
import { GetClassInput } from "./dto/get_class.input";
import { GetClassListInput } from "./dto/get_class_list.input";

class ClassService {
  constructor(private readonly db: PrismaClient) {}

  async getClassById(input: GetClassInput) {
    const klass = await this.db.class.findUnique({
      where: { id: input.classId },
    });

    return klass;
  }

  async createClass(input: CreateClassInput) {
    const klass = await this.db.class.create({
      data: {
        name: input.name,
        description: input.description,
        center: {
          connect: {
            id: input.centerId,
          },
        },
        classMembers: {
          createMany: { data: input.classMember.map((e) => ({ userId: e })) },
        },
      },
    });

    return klass;
  }

  async getClassList(input: GetClassListInput) {
    const klasses = await this.db.class.findMany({
      take: input.take,
      cursor: input.cursor ? { id: input.cursor } : undefined,
      skip: input.cursor ? 1 : undefined,
      where: {
        centerId: input.centerId,
      },
    });

    return klasses;
  }
}

export default ClassService;
