import { useEffect } from "react";
import { useRouter } from "next/router";

export default function WarehouseRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/warehouse-for-rent-rwanda"); }, []);
  return null;
}
