import { PrismaClient } from "@prisma/client";
import { CreateUserInput } from "./dto/create_user.input";
import { GetUserListInput } from "./dto/get_user_list.input";

class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async findUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createUser(input: CreateUserInput, centerId: string) {
    const {
      email,
      password,
      role,
      firstName,
      lastName,
      phoneNumber,
      username,
    } = input;

    const user = await this.prisma.user.create({
      data: {
        email,
        password,
        role,
        firstName,
        lastName,
        phoneNumber,
        username,
        center: {
          connect: {
            id: centerId,
          },
        },
      },
    });

    return user;
  }

  async getUserList(input: GetUserListInput, centerId: string) {
    const { take, cursor } = input;

    const userList = await this.prisma.user.findMany({
      where: {
        centerId,
      },
      take,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return userList;
  }
}

export default UserService;
