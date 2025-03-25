export interface CreateUserParams {
  walletAddress?: string;
  username?: string | null;
  image?: string | null;
}

export interface GetUserParams {
  walletAddress?: string;
}

export interface DeleteUserParams {
  clerkUserId: string;
}

// export interface GetUserParams {
//   _id: string;
//   clerkUserId: string;
//   email: string;
//   username: string | null;
//   image: string;
//   createAt: Date;
// }

interface User {
  _id: string;
  email: string;
  image: string;
  walletAddress: string;
  username: string;
}

export interface CreatePostParams {
  name: string;
  image: string;
}

export interface CreateTicketParams {
  eventID: string;
  type: string;
  price: number;
  bucketUrl: string;
}

export interface GetPostParams {
  name: string;
  image: string;
  description: string;
}
