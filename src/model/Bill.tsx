import BillItem from "../model/BillItem";

class Bill {
  billno: string;
  billdate: number;
  billtoyear: string;
  billtoqtr: string;
  billperiod: string;
  tdno: string;
  name: string;
  address: string;
  fullpin: string;
  rputype: string;
  lguname: string;
  barangay: string;
  classification: string;
  ownername: string;
  amount: number;
  items: BillItem[];

  public constructor(data: any) {
    const info = data?.info || {};
    this.billno = info.billno ?? "";
    this.billdate = info.billdate ?? 0;
    this.billtoyear = info.billtoyear ?? "";
    this.billtoqtr = info.billtoqtr ?? "";
    this.billperiod = info.billperiod ?? "";
    this.tdno = info.tdno ?? "";
    this.name = info.taxpayer?.name ?? "";
    this.address = info.taxpayer?.address ?? "";
    this.fullpin = info.fullpin ?? "";
    this.rputype = info.rputype ?? "";
    this.lguname = info.lguname ?? "";
    this.barangay = info.barangay ?? "";
    this.classification = info.classification ?? "";
    this.ownername = info.owner?.name ?? "";
    this.amount = info.amount ?? 0;
    this.items = (info.items || []).map((item: any) => new BillItem(item));
  }
}

export default Bill;
