class BillItem {
  objid: string;
  code: string;
  title: string;
  fundobjid: string;
  fundcode: string;
  fundtitle: string;
  revtype: string;
  revperiod: number;
  amount: number;
  discount: number;
  share: number;
  sharedisc: number;

  public constructor(data: any) {
    this.objid = data.item.objid || "";
    this.code = data.item.code || "";
    this.title = data.item.title || "";
    this.fundobjid = data.item.fund.objid || "";
    this.fundcode = data.item.fund.objid || "";
    this.fundtitle = data.item.fund.title || "";
    this.revtype = data.revtype || "";
    this.revperiod = data.revperiod || 0;
    this.amount = data.amount || 0;
    this.discount = data.discount || 0;
    this.share = data.share || 0;
    this.sharedisc = data.sharedisc || 0;
  }
}

export default BillItem;
