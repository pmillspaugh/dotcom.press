import TldWiki from "@/components/TldWiki";
import { Suspense } from "react";

export default function TldWikiPage() {
  return (
    <Suspense fallback={<>...</>}>
      <TldWiki />
    </Suspense>
  );
}
