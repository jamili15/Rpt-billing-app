import Service from "../lib/server/remote-service";

export const findByGroupAndName = async ({
  groupname,
  name,
}: {
  groupname: string;
  name: string;
}) => {
  const svc = Service.lookup("CloudPartnerService", "partner");
  const data = await svc.invoke("findByGroupAndName", {
    groupname,
    name,
  });
  return data;
};
