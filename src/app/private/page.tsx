import { redirect } from "next/navigation";

import { createClient } from "@/lib/utils/supabase/server";
import SignOutButton from "./sign-out-button";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <p>Hello {data.user.email}</p>
      <SignOutButton />
    </>
  );
}
