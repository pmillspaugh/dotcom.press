import { SearchParams } from "next/dist/server/request/search-params";
import Verify from "@/components/Verify";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { email, token } = await searchParams;

  return <Verify email={email} token={token} />;
}
