import ClassService from "./class.service";
import { CreateClassInput } from "./dto/create_class.input";
import { CreateClassResponse } from "./dto/create_class.response";
import { GetClassInput } from "./dto/get_class.input";
import { GetClassResponse } from "./dto/get_class.response";
import { GetClassListInput } from "./dto/get_class_list.input";
import { GetClassListResponse } from "./dto/get_class_list.response";

class ClassController {
  constructor(private readonly classService: ClassService) {}

  async createClass(input: CreateClassInput): Promise<CreateClassResponse> {
    const klass = await this.classService.createClass(input);

    return {
      data: {
        class: klass,
      },
      message: "Created class successfully",
    };
  }

  async getClass(input: GetClassInput): Promise<GetClassResponse> {
    const klass = await this.classService.getClassById(input);

    if (!klass) {
      throw new Error("Class is not found");
    }

    return {
      data: {
        class: klass,
      },
      message: "Get class successfully",
    };
  }

  async getClassList(input: GetClassListInput): Promise<GetClassListResponse> {
    const klasses = await this.classService.getClassList(input);

    if (klasses.length < input.take) {
      return {
        data: {
          nodes: klasses,
          pageInfo: {
            hasNextPage: false,
          },
        },
        message: "Get class list successfully",
      };
    }

    const cursor = klasses[klasses.length - 1].id;

    const nextCall = await this.classService.getClassList({ ...input, cursor });

    if (nextCall.length == 0) {
      return {
        data: {
          nodes: klasses,
          pageInfo: {
            hasNextPage: false,
          },
        },
        message: "Get class list successfully",
      };
    }

    return {
      data: {
        nodes: klasses,
        pageInfo: {
          hasNextPage: true,
          cursor,
        },
      },
      message: "Get class list successfully",
    };
  }
}

export default ClassController;
