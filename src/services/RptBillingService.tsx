import Service from "@/common/lib/server/remote-service";
import { Bill } from "@/types";

export const getBilling = async ({
  partnerid,
  refno,
  billtoqtr = 4,
  billtoyear = 2024,
  showdetails = true,
}: {
  partnerid: string;
  refno: string;
  billtoqtr?: number;
  billtoyear?: number;
  showdetails?: boolean;
}) => {
  try {
    const svc = Service.lookup(
      `${partnerid}:OnlineLandTaxBillingService`,
      "etracs"
    );

    const bill = await svc.invoke("getBilling", {
      refno,
      billtoqtr,
      billtoyear,
      showdetails,
    });

    const data: Bill = {
      billno: bill.info.billno,
      billdate: bill.info.billdate,
      billtoyear: bill.info.billtoyear,
      billtoqtr: bill.info.billtoqtr,
      billperiod: bill.info.billperiod,
      taxpayer: {
        name: bill.info.taxpayer.name,
        address: bill.info.taxpayer.address,
        objid: bill.info.taxpayer.objid,
      },
      tdno: bill.info.tdno,
      fullpin: bill.info.fullpin,
      rputype: bill.info.rputype,
      lguname: bill.info.lguname,
      barangay: bill.info.barangay,
      titleno: bill.info.titleno,
      classification: bill.info.classification,
      cadastrallotno: bill.info.cadastrallotno,
      administrator: {
        name: bill.info.administrator.name,
        address: bill.info.administrator.address,
      },
      owner: {
        name: bill.info.owner.name,
      },
      totalav: bill.info.totalav,
      totalmv: bill.info.totalmv,
      totalareaha: bill.info.totalareaha,
      totalareasqm: bill.info.totalareasqm,
      totals: {
        basic: bill.info.totals.basic,
        basicdisc: bill.info.totals.basicdisc,
        basicint: bill.info.totals.basicint,
        basicnet: bill.info.totals.basicnet,
        basicdp: bill.info.totals.basic,
        sef: bill.info.totals.sef,
        sefint: bill.info.totals.sefint,
        sefdisc: bill.info.totals.sefdisc,
        sefnet: bill.info.totals.sefnet,
        sefdp: bill.info.totals.sefdp,
        total: bill.info.totals.total,
      },
      amount: bill.info.amount,
      fromyear: bill.info.fromyear,
      fromqtr: bill.info.fromqtr,
      toyear: bill.info.toyear,
      toqtr: bill.info.toqtr,
      validuntil: bill.info.validuntil,
      txntypename: bill.info.txntypename,
      items: bill.info.items,
      particulars: `Real Property Tax TD No. ${bill?.info.tdno} Payment for: ${bill?.info.billperiod}`,
      txntype: "rptcol",
      error: bill.error,
    };

    if (bill.status === "ERROR") {
      return { code: "01", error: bill.msg };
    }

    return data;
  } catch (error) {
    console.error("Error fetching billing:", error);
    return {
      code: "01",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
