"use client";

import EmailVerification from "@/common/components/EmailVerification";
import { usePartnerContext } from "@/common/components/PartnerModel";
import PayerInfo from "@/common/components/PayerInfo";
import MasterLayout from "@/common/layouts/MasterLayout";
import { lookupService } from "@/common/lib/client";
import RptBilling from "@/components/RptBilling";
import { useBillingContext } from "@/components/RptContextController";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { title, setId, resources } = usePartnerContext();
  const [step, setStep] = useState<string>("billing");
  const { bill } = useBillingContext();

  const handler = () => {
    if (step === "email") {
      setStep("billing");
    } else if (step === "billing") {
      setStep("payerinfo");
    }
  };

  const onCancel = () => {
    if (step === "billing") {
      setStep("email");
    } else if (step === "payerinfo") {
      setStep("billing");
    }
  };

  useEffect(() => {
    if (params.id) {
      setId(params.id);
    }
  }, [params.id, setId]);

  let moduleTitle = "Realty Tax Online Billing and Payment";

  return (
    <MasterLayout lgucaption={title} lguLogo={resources}>
      {step === "email" && (
        <EmailVerification moduleTitle={moduleTitle} onSuccess={handler} />
      )}

      {step === "billing" && (
        <RptBilling
          moduleTitle={moduleTitle}
          onCancel={onCancel}
          onSuccess={handler}
        />
      )}

      {step === "payerinfo" && (
        <PayerInfo
          moduleTitle={moduleTitle}
          onSuccess={() => {}}
          onCancel={onCancel}
          billAmount={bill?.amount ?? 0}
        />
      )}
    </MasterLayout>
  );
}
