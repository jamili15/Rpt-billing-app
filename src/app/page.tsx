"use client";

import { usePartnerContext } from "@/common/components/Email/PartnerModel";
import { lookupService } from "@/common/lib/client";
import { useEffect } from "react";

export default function Home() {
  const svc = lookupService("RealTaxBillingService");
  const { partner } = usePartnerContext();

  return (
    <div>
      hello
      <button>fetched data</button>
    </div>
  );
}
