import { useEffect } from "react";
import { useRouter } from "next/router";

export default function HousesRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/houses/for-sale"); }, []);
  return null;
}
