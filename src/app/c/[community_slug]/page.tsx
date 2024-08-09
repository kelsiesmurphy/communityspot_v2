import { createClient } from "@/lib/utils/supabase/client";

export async function generateStaticParams() {
  const supabase = createClient();

  const { data: communities, error } = await supabase
    .from("communities")
    .select("slug");

  if (error) {
    console.error("Error fetching communities:", error.message);
    return [];
  }
  if (!communities) {
    return [];
  }

  return communities.map((community: { slug: any }) => ({
    slug: community.slug,
  }));
}

export default async function CommunityHome({
  params,
}: {
  params: { community_slug: string };
}) {
  const supabase = createClient();

  const { data: community, error } = await supabase
    .from("communities")
    .select("*")
    .eq("slug", params.community_slug)
    .single();

  if (error || !community) {
    console.log(error);
    return <div>Community not found</div>;
  }

  return (
    <div>
      <h1>{JSON.stringify(community)}</h1>
    </div>
  );
}
