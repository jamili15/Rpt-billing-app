export type Partner = {
  channelid: string;
  clientid: string;
  clusterid: string;
  email: string;
  excludeservices: string;
  group: Groupitem;
  id: string;
  includeservices: string;
  logo: string;
  name: string;
  phoneno: string;
  state: string;
  subtype: string;
  title: string;
  type: string;
};

export type Groupitem = {
  name: string;
  objid: string;
  title: string;
};
