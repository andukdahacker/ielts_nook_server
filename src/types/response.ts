import { Static, TSchema, Type } from "@sinclair/typebox";

interface BaseResponseSchemaOpts {
  $id?: string;
}

const BaseResponseSchema = <T extends TSchema>(
  schema: T,
  opts?: BaseResponseSchemaOpts,
) =>
  Type.Object(
    {
      data: schema,
      message: Type.String(),
    },
    { $id: opts?.$id },
  );

const NoDataResponseSchema = Type.Object({
  message: Type.String(),
});

type NoDataResponse = Static<typeof NoDataResponseSchema>;

const BaseResponseErrorSchema = Type.Object({
  error: Type.String(),
  message: Type.String(),
});

const PageInfoSchema = Type.Object({
  hasNextPage: Type.Boolean(),
  cursor: Type.Optional(Type.String()),
});

const PaginatedBaseReponseSchema = <T extends TSchema>(schema: T) =>
  Type.Object({
    data: Type.Optional(
      Type.Object({
        nodes: Type.Array(schema),
        pageInfo: PageInfoSchema,
      }),
    ),
    message: Type.String(),
  });

export {
  BaseResponseErrorSchema,
  BaseResponseSchema,
  NoDataResponse,
  NoDataResponseSchema,
  PaginatedBaseReponseSchema,
};
