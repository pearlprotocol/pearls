import axios from "axios";
export async function getUser(jwt: string): Promise<{}> {
  const data = await axios.get(`${"http://localhost:8080"}/user`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  console.log(data.data);

  const returnData = {
    id: data.data.id,
    createdAt: data.data.createdAt,
    updatedAt: data.data.updatedAt,
    email: data.data.email,
    address: data.data.address,
    avatar: data.data.avatar,
  };
  console.log("constructor", returnData);
  return returnData;
}

// model User {
//     id            String          @id @default(auto()) @map("_id") @db.ObjectId
//     createdAt     DateTime        @default(now())
//     updatedAt     DateTime        @updatedAt
//     email         String          @unique
//     address       String          @unique
//     name          String?
//     avatar        String?
//     bio           String?
//     twitter       String?
//     metadata      Json?
//     Project       Project[]
//     ProjectMember ProjectMember[]
//     ClientSecret  ClientSecret[]
//     Session       Session[]
//   }
