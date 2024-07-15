import { Button } from "@/common/io/Button";
import { Text } from "@/common/io/Text";
import { ActionBar } from "@/common/ui/ActionBar";
import Card from "@/common/ui/Card";
import { required } from "@/common/validators";
import Currency from "../../io/Currency";
import { usePartnerContext } from "../Email/PartnerModel";
import { lookupService } from "@/common/lib/client";
import { Bill } from "@/types";

const PayerInfo = (props: any) => {
  const bill: Bill = props.formValues.bill;
  const { partner, id } = usePartnerContext();
  const svc = lookupService("EPaymentService");

  let descriptionText =
    "Please confirm by filling in the name and address of the Payer for your electronic Official Receipt. Click Continue to proceed with payment.";

  const handleClickNext = async () => {
    const order = {
      origin: "filipizen",
      txntype: bill?.txntype,
      txntypename: bill?.txntypename,
      refno: bill?.tdno,
      amount: bill?.amount,
      particulars: bill?.particulars,
      partner: {
        id: partner?.channelid,
        title: partner?.title,
        group: {
          objid: partner?.group.objid,
          name: partner?.group.name,
          title: partner?.group.title,
        },
      },
      payOption: { objid: "PAYMAYA" },
      paidby: props.formValues.payername,
      paidbyaddress: props.formValues.payeraddress,
      email: props.formValues.email,
      mobileno: props.formValues.phone,
      items: bill?.items,
      info: {
        data: bill,
      },
    };
    const res = await svc?.invoke("checkout", {
      order: order,
      partner: {
        id: partner?.channelid,
        name: partner?.name,
        title: partner?.title,
        group: {
          objid: partner?.group.objid,
          name: partner?.group.name,
          title: partner?.group.title,
        },
      },
      redirectUrl: {
        cancelUrl: `http://localhost:3001/partners/${id}/rpt/billing`,
        successUrl: `http://localhost:3001/partners/${id}/rpt/billing`,
      },
    });
  };

  return (
    <Card
      title={props.title}
      subTitleText={props.page.caption}
      description={descriptionText}
    >
      <Text
        name="payername"
        label="Payer Name"
        validate={required}
        variant="standard"
      />
      <Text
        name="payeraddress"
        label="Payer Address"
        validate={required}
        variant="standard"
      />
      <h2 className="flex justify-center m-2">Payment Details</h2>
      <div className="flex flex-col justify-center items-center gap-y-4">
        <div className="w-full border border-black font-bold p-4">
          <Currency
            classname="flex justify-center"
            currency="Php"
            amount={bill?.amount ?? 0}
          />
        </div>
      </div>
      <ActionBar>
        <Button
          onClick={props.onCancel}
          variant="text"
          className="font-bold text-[#6200EE] bg-white hover:bg-[#b898e626] px-5"
        >
          Back
        </Button>
        <Button
          type="submit"
          onClick={handleClickNext}
          disabled={props.hasValidationErrors}
        >
          Continue
        </Button>
      </ActionBar>
    </Card>
  );
};

export default PayerInfo;
