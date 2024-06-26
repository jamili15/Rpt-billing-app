import Service from "@/common/lib/server/remote-service";

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

    if (bill.status === "ERROR") {
      return { code: "01", error: bill.msg };
    }
    return bill;
  } catch (err) {
    return {
      code: "02",
      error: err,
    };
  }
};
