import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import {
  users,
  communities,
  events,
  photos,
  community_members,
  community_committee_members,
  community_documents,
} from "../../lib/placeholder-data";

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      profile_image TEXT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, first_name, last_name, profile_image, email, password)
        VALUES (${user.id}, ${user.first_name}, ${user.last_name}, ${user.profile_image}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedCommunities() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS communities (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL,
      theme JSONB,
      description TEXT,
      logo TEXT,
      cover_image TEXT
    );
  `;

  const insertedCommunities = await Promise.all(
    communities.map(
      (community) => client.sql`
        INSERT INTO communities (name, slug, theme, description, logo, cover_image)
        VALUES (${community.name}, ${community.slug}, ${JSON.stringify(community.theme)}::jsonb, ${community.description}, ${community.logo}, ${community.cover_image})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCommunities;
}

async function seedEvents() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS events (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      community_id UUID NOT NULL,
      title VARCHAR(255) NOT NULL,
      link TEXT,
      description TEXT,
      location JSONB,
      start_timestamp TIMESTAMPTZ,
      end_timestamp TIMESTAMPTZ
    );
  `;

  const insertedEvents = await Promise.all(
    events.map(
      (event) => client.sql`
        INSERT INTO events (community_id, title, link, description, location, start_timestamp, end_timestamp)
        VALUES (${event.community_id}, ${event.title}, ${event.link}, ${event.description}, ${JSON.stringify(event.location)}, ${event.start_timestamp}, ${event.end_timestamp})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedEvents;
}

async function seedPhotos() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS photos (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      community_id UUID NOT NULL,
      event_id UUID,
      url TEXT NOT NULL,
      alt_text VARCHAR(255)
    );
  `;

  const insertedPhotos = await Promise.all(
    photos.map(
      (photo) => client.sql`
        INSERT INTO photos (community_id, event_id, url, alt_text)
        VALUES (${photo.community_id}, ${photo.event_id}, ${photo.url}, ${photo.alt_text})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedPhotos;
}

async function seedCommunityMembers() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS community_members (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      community_id UUID NOT NULL,
      user_id UUID NOT NULL
    );
  `;

  const insertedCommunityMembers = await Promise.all(
    community_members.map(
      (community_member) => client.sql`
        INSERT INTO community_members (community_id, user_id)
        VALUES (${community_member.community_id}, ${community_member.user_id})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCommunityMembers;
}

async function seedCommunityCommitteeMembers() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS community_committee_members (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      community_id UUID NOT NULL,
      community_member_id UUID NOT NULL,
      role VARCHAR(255)
    );
  `;

  const insertedCommunityCommitteeMembers = await Promise.all(
    community_committee_members.map(
      (community_committee_member) => client.sql`
        INSERT INTO community_committee_members (community_id, community_member_id, role)
        VALUES (${community_committee_member.community_id}, ${community_committee_member.community_member_id}, ${community_committee_member.role})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCommunityCommitteeMembers;
}

async function seedCommunityDocuments() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS community_documents (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      community_id UUID NOT NULL,
      doc_type VARCHAR(255) NOT NULL,
      markdown_text TEXT,
      link_url TEXT
    );
  `;

  const insertedCommunityDocuments = await Promise.all(
    community_documents.map(
      (community_documents) => client.sql`
        INSERT INTO community_documents (community_id, doc_type, markdown_text, link_url)
        VALUES (${community_documents.community_id}, ${community_documents.doc_type}, ${community_documents.markdown_text}, ${community_documents.link_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCommunityDocuments;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedCommunities();
    await seedEvents();
    await seedPhotos();
    await seedCommunityMembers();
    await seedCommunityCommitteeMembers();
    await seedCommunityDocuments();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
