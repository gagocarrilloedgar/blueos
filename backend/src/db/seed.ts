import "dotenv/config";

import { clerkClient } from "@clerk/fastify";
import { db } from ".";
import {
  accountsTable,
  membershipsTable,
  organisationsTable,
  projectsTable,
} from "./schema/main";

async function seed() {
  // Based on the "./schema/main.ts" file, create the necessary data to seed the database
  // Take into account that you need first to create the clerk users

  const user1Promise = clerkClient.users.createUser({
    emailAddress: ["edgar+clerk_test@useblueos.com"],
    password: "password",
    skipLegalChecks: true,
    skipPasswordChecks: true,
  });

  const user2Promise = clerkClient.users.createUser({
    emailAddress: ["hello+clerk_test@useblueos.com"],
    password: "password",
    skipLegalChecks: true,
    skipPasswordChecks: true,
  });

  const data = await Promise.all([user1Promise, user2Promise]);

  const organisation = await db.insert(organisationsTable).values({
    name: "BlueOS",
    size: 1,
  }).returning();

  const organisationId = organisation[0].id;

  await Promise.all(data.map(async (user) => {
    const account = await db.insert(accountsTable).values({
      userId: user.id,
      name: user.emailAddresses[0].emailAddress.split("@")[0],
      email: user.emailAddresses[0].emailAddress,
    }).returning();

    await db.insert(membershipsTable).values({
      ownerId: organisationId,
      ownerType: "organisation",
      accountId: account[0].id,
    });
  }));

  await db.insert(projectsTable).values([{
    name: "BlueOS",
    organisationId: organisationId,
  }, {
    name: "BlueOS 2",
    organisationId: organisationId,
  }]);
}

seed().then(() => {
  console.log("Seed completed");
  process.exit(0);
});
