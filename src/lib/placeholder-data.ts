// This file contains placeholder data
const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    first_name: "John",
    last_name: "Doe",
    profile_image:
      "https://www.pexels.com/photo/portrait-photo-of-man-1722198/",
    email: "user@nextmail.com",
    password: "123456",
  },
];

const communities = [
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "Fellow Humans",
    slug: "fellow-humans",
    theme: {
      font: "placeholder",
      primary_colour: "#1501f5",
      secondary_colour: "#FFFFFF",
    },
    description: "Curated Events Bringing Humans Together",
    logo: "https://assets.bigcartel.com/account_images/6694384/Fellow+Humans+LogoNEWNEWq.png?auto=format&fit=max&h=1200&w=1200",
    cover_image:
      "https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    name: "People Planet Pint",
    slug: "people-planet-pint",
    theme: {
      font: "placeholder",
      primary_colour: "#2351d5",
      secondary_colour: "#FFFFFF",
    },
    description:
      "No agenda, workshops or webinars. Just chat over some drinks. Pop down to your local People Planet Pint to find more about what’s going on locally with sustainability and how you can get involved.",
    logo: "https://media.licdn.com/dms/image/C4D0BAQFxKDzjDWpI0g/company-logo_200_200/0/1630537682326/small99_logo?e=2147483647&v=beta&t=simed9nZldId-2e2c8NLVw-TH-PeuJThE4FAfk7uhDI",
    cover_image:
      "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    name: "Clyde Mountaineering Club",
    slug: "clydemc",
    theme: {
      font: "placeholder",
      primary_colour: "#060d31",
      secondary_colour: "#FFFFFF",
    },
    description:
      "A group of friendly, kind and like-minded people who like to get out and have challenging days in the mountains, safely.",
    logo: "https://clydemc.org/media/uploads/photos/60d4c191-5308-474d-a10d-5465b3570e91.jpeg",
    cover_image:
      "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const events = [
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6b6442a",
    community_id: communities[0].id,
    title: "Board Games Night",
    link: "www.google.com",
    description:
      "Want to make friends and paint Tote Bags?! Join us while we have a wholesome evening of tote bag painting + connection! They'll be good music, refreshing soft drinks and very cool people.",
    location: {
      online_link: "www.google.com",
      address: "123 Moors Way",
    },
    start_timestamp: "2024-07-21T17:30:00Z",
    end_timestamp: "2024-07-21T19:30:00Z",
  },
];

const photos = [
  {
    id: "3e5d1e1b-b2d5-4f5b-91c8-1d234c1e94b1",
    community_id: communities[0].id,
    event_id: events[0].id,
    url: "https://images.pexels.com/photos/20827831/pexels-photo-20827831/free-photo-of-person-fingers-holding-dandelion-on-meadow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt_text: "Person Fingers Holding Dandelion on Meadow",
  },
];

const community_members = [
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a2bd81aa",
    community_id: communities[0].id,
    user_id: users[0].id,
  },
];

const community_committee_members = [
  {
    id: "7f9e0b75-3d5d-456f-a5c3-ffed4ef6c2b1",
    community_id: communities[0].id,
    community_member_id: community_members[0].id,
    role: "Admin",
  },
];

const community_documents = [
  {
    id: "9d1e1e1b-7d5d-4f5b-a1c8-2d234d1e94b2",
    community_id: communities[0].id,
    doc_type: "link",
    markdown_text: "",
    link_url: "www.google.com",
  },
];

export {
  users,
  communities,
  events,
  photos,
  community_members,
  community_committee_members,
  community_documents,
};
