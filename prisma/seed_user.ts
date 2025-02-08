import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import { parseArgs } from "node:util";

async function seed() {
  const {
    values: { centerId },
  } = parseArgs({ options: { centerId: { type: "string" } } });
  const prisma = new PrismaClient();

  const hashed = await argon2.hash("Ducdeptraino1@");
  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        email: `user${i}@gmail.com`,
        password: hashed,
        role: "STUDENT",
        center: {
          connect: {
            id: centerId,
          },
        },
        firstName: "User",
        lastName: `${i}`,
      },
    });
  }
}

seed()
  .then(() => console.log("Seeding done"))
  .catch((error) => console.log("Error seeding: ", error));
