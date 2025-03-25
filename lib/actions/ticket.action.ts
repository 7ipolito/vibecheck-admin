import image from "next/image";
import client from "../client";
import { CreateTicketParams } from "./shared.types";
import { CREATE_TICKET } from "@/graphql/mutations";

export async function createTicket(userData: CreateTicketParams) {
  const { bucketUrl, eventID, price, type } = userData;

  try {
    const response = await client.mutate({
      mutation: CREATE_TICKET,
      variables: {
        eventId: eventID,
        type,
        price,
        bucketUrl,
      },
    });

    return response;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
}
