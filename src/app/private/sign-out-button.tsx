"use client";

import { Button } from "@/components/ui/button";
import { signout } from "../../lib/utils/actions";

export default function signOutButton() {
  return <Button onClick={() => signout()}>Signout</Button>;
}
