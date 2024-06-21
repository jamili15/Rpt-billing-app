"use client";

import { lookupService } from "@/common/lib/client";
import { createContext, useContext, useEffect, useState } from "react";

interface PartnerContextTypeProps {
  children: React.ReactNode;
}

interface PartnerContextType {
  id: string;
  title: string;
  name: string;
  channelId: string;
  resources: string;
  setId: (id: string) => void;
  setTitle: (groupName: string) => void;
  setName: (name: string) => void;
  setChannelId: (channelId: string) => void;
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export const PartnerProvider: React.FC<PartnerContextTypeProps> = ({
  children,
}) => {
  const svc = lookupService("CloudPartnerService");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [channelId, setChannelId] = useState("");
  const [resources, setResources] = useState("");

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const location = id.split("_");
        const data = await svc?.invoke("findByGroupAndName", {
          groupname: location[0],
          name: location[1],
        });
        if (data) {
          setTitle(data.title || "");
          setName(data.name || "");
          setChannelId(data.channelid || "");
          let hostUrl = process.env.NEXT_PUBLIC_FILIPIZEN_HOST;
          if (hostUrl) {
            if (!hostUrl.startsWith("http://")) {
              hostUrl = "http://" + hostUrl;
              setResources(`${hostUrl}/resources/${data.channelid}.png`);
            }
            setResources(`${hostUrl}/resources/${data.channelid}.png`);
          } else {
            console.error("FILIPIZEN_HOST is not defined.");
          }
        }
      }
    };
    loadData();
  }, [id]);

  return (
    <PartnerContext.Provider
      value={{
        id,
        title,
        name,
        channelId,
        resources,
        setTitle,
        setName,
        setId,
        setChannelId,
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
