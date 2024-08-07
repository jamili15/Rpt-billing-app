"use client";

import { lookupService } from "@/common/lib/client";
import { Partner } from "@/common/types";
import { createContext, useContext, useEffect, useState } from "react";

interface PartnerContextTypeProps {
  children: React.ReactNode;
}

interface PartnerContextType {
  id: string;
  partner: Partner | undefined | null;
  resources: string;
  setId: (id: string) => void;
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export const PartnerProvider: React.FC<PartnerContextTypeProps> = ({
  children,
}) => {
  const svc = lookupService("CloudPartnerService");
  const [id, setId] = useState("");
  const [partner, setPartner] = useState<Partner | null>();
  const [resources, setResources] = useState("");

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const location = id.split("_");
        const partner: Partner = await svc?.invoke("findByGroupAndName", {
          groupname: location[0],
          name: location[1],
        });
        setPartner(partner);
        setResources(`/assets/partner/${partner.channelid}.png`);
      }
    };
    loadData();
  }, [id]);

  return (
    <PartnerContext.Provider
      value={{
        id,
        partner,
        resources,
        setId,
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartnerContext = () => {
  const context = useContext(PartnerContext);
  if (!context) {
    throw new Error("usePartnerContext must be used within a PartnerProvider");
  }
  return context;
};
