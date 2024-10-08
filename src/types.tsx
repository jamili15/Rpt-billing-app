export type Bill = {
  billno: string;
  billdate: number;
  billtoyear: string;
  billtoqtr: string;
  billperiod: string;
  taxpayer: Taxpayer;
  tdno: string;
  fullpin: string;
  rputype: string;
  lguname: string;
  barangay: string;
  titleno: string | null;
  classification: string;
  cadastrallotno: string;
  administrator: {
    name: string | null;
    address: string | null;
  };
  owner: Owner;
  totalav: number;
  totalmv: number;
  totalareaha: number;
  totalareasqm: number;
  totals: Totals;
  amount: number;
  fromyear: number;
  fromqtr: number;
  toyear: number;
  toqtr: number;
  validuntil: string;
  txntypename: string;
  items: BillItem[];
  particulars: string;
  txntype: string;
  error: string;
};

export type BillItem = {
  item: {
    objid: string;
    code: string;
    title: string;
  };
  fund: {
    objid: string;
    code: string;
    title: string;
  };
  revtype: string;
  revperiod: number;
  amount: number;
  discount: number;
  share: number;
  sharedisc: number;
};

export type Taxpayer = {
  name: string;
  address: string;
  objid: string;
};

export type Owner = {
  name: string;
};

export type Totals = {
  basic: number;
  basicdisc: number;
  basicint: number;
  basicnet: number;
  basicdp: number;
  sef: number;
  sefint: number;
  sefdisc: number;
  sefnet: number;
  sefdp: number;
  total: number;
};
