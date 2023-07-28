import { GraphQLList, GraphQLNonNull } from "graphql";
import type { GraphQLNullableType } from "graphql";

export class Schema {
  public static nonNull<T extends GraphQLNullableType>(type: T) {
    return new GraphQLNonNull(type);
  }

  public static nonNullArray<T extends GraphQLNullableType>(type: T) {
    return new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(type)));
  }
}
