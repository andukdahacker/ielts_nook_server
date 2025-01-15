import argon2 from "argon2";
import { AppJwtPayload } from "../../middlewares/auth.middleware";
import { CreateUserInput } from "./dto/create_user.input";
import { CreateUserResponse } from "./dto/create_user.response";
import { GetUserListInput } from "./dto/get_user_list.input";
import { GetUserListResponse } from "./dto/get_user_list.response";
import { UpdateUserInput } from "./dto/update_user.input";
import { UpdateUserResponse } from "./dto/update_user.response";
import UserService from "./user.service";

class UserController {
  constructor(private readonly userService: UserService) {}

  async updateUser(input: UpdateUserInput): Promise<UpdateUserResponse> {
    const user = await this.userService.updateUser(input);

    return {
      data: {
        user
      },
      message: "Updated user successfully"
    }
  }

  private async getCenterId(jwtPayload: AppJwtPayload) {
    let centerId = null;

    if (jwtPayload.isCenter) {
      centerId = jwtPayload.id;
    } else {
      const user = await this.userService.findUserById(jwtPayload.id);
      if (!user) {
        throw new Error("Cannot find user");
      }

      centerId = user.centerId;
    }

    if (!centerId) {
      throw new Error("Cannot get centerId");
    }

    return centerId;
  }

  async createUser(
    input: CreateUserInput,
    jwtPayload: AppJwtPayload,
  ): Promise<CreateUserResponse> {
    const centerId = await this.getCenterId(jwtPayload);

    const { password } = input;

    const hash = await argon2.hash(password);

    const user = await this.userService.createUser(
      { ...input, password: hash },
      centerId,
    );

    return {
      data: {
        user,
      },
      message: "Created user successfully",
    };
  }

  async getUserList(
    input: GetUserListInput,
    jwtPayload: AppJwtPayload,
  ): Promise<GetUserListResponse> {
    const centerId = await this.getCenterId(jwtPayload);

    const users = await this.userService.getUserList(input, centerId);

    if (users.length < input.take) {
      return {
        data: {
          nodes: users,
          pageInfo: { hasNextPage: false },
        },
        message: "Get user list successfully",
      };
    }

    const cursor = users[users.length - 1].id;

    const nextCall = await this.userService.getUserList(
      { ...input, cursor },
      centerId,
    );

    if (nextCall.length == 0) {
      return {
        data: {
          nodes: users,
          pageInfo: { hasNextPage: false },
        },
        message: "Get user list successfully",
      };
    }

    return {
      data: {
        nodes: users,
        pageInfo: { hasNextPage: true, cursor },
      },
      message: "Get user list successfully",
    };
  }
}

export default UserController;
