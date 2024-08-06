"use client";

import { Button } from "@/components/ui/button";
import { signout } from "../(site)/(auth)/actions";

export default function signOutButton() {
  return <Button onClick={() => signout()}>Signout</Button>;
}
