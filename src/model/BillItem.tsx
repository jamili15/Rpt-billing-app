class BillItem {
  account: string;
  amount: number;
  discount: number;
  interest: number;
  lobname: string;
  surcharge: number;
  total: number;

  public constructor(data: any) {
    this.account = data.account || "";
    this.amount = data.amount || 0;
    this.discount = data.discount || 0;
    this.interest = data.interest || 0;
    this.lobname = data.lobname || "";
    this.surcharge = data.surcharge || 0;
    this.total = data.total || 0;
  }
}

export default BillItem;
