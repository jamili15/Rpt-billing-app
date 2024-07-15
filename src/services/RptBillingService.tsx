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
      ...bill.info,
      particulars: `Real Property Tax TD No. ${bill?.info.tdno} Payment for: ${bill?.info.billperiod}`,
      txntype: "rptcol",
    };

    if (bill.status === "ERROR") {
      return { code: "01", error: bill.msg };
    }
    return data;
  } catch (err) {
    return {
      code: "02",
      error: err,
    };
  }
};
