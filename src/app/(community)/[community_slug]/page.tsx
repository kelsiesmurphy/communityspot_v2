export default function CommunityIndex({
  params,
}: {
  params: { community_slug: string };
}) {
  return (
    <div>
      CommunityIndex
      <p>Page: {params.community_slug}</p>
    </div>
  );
}
