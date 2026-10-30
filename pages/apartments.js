import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Apartments() {
  const router = useRouter();
  useEffect(() => { router.replace("/houses/for-sale"); }, [router]);
  return null;
}
