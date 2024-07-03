"use client";

import EmailVerification from "@/common/components/Email/EmailVerification";
import { usePartnerContext } from "@/common/components/Email/PartnerModel";
import PayerInfo from "@/common/components/Payer/PayerInfo";
import MasterLayout from "@/common/layouts/MasterLayout";
import PageFlow from "@/common/ui/PageFlow";
import BillingInfo from "@/components/BillingInfo";
import RefAccount from "@/components/RefNo";
import { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { partner, setId, resources } = usePartnerContext();
  let moduleTitle = "Realty Tax Online Billing and Payment";

  useEffect(() => {
    if (params.id) {
      setId(params.id);
    }
  }, [setId]);

  const pages = [
    // {
    //   name: "Email Verification",
    //   caption: "Email Verification",
    //   Component: EmailVerification,
    // },
    {
      name: "Ref no",
      caption: "Initial Information",
      Component: RefAccount,
    },
    {
      name: "Billing Information",
      caption: "Billing Information",
      Component: BillingInfo,
    },
    {
      name: "Payer Information",
      caption: "Confirm Transaction",
      Component: PayerInfo,
    },
  ];
  return (
    <MasterLayout lgucaption={partner?.title} lguLogo={resources}>
      <PageFlow title={moduleTitle} pages={pages} />
    </MasterLayout>
  );
}
