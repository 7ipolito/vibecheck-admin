import image from "next/image";
import client from "../client";
import { CreatePostParams } from "./shared.types";
import { CREATE_POST } from "@/graphql/mutations";

export async function createSimplePost(userData: CreatePostParams) {
  const { name, image } = userData;

  try {
    const response = await client.mutate({
      mutation: CREATE_POST,
      variables: {
        name,
        image,
      },
    });

    return response;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
}
