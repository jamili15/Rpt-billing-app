import { Button } from "@/common/io/Button";
import { Text } from "@/common/io/Text";
import { ActionBar } from "@/common/ui/ActionBar";
import Card from "@/common/ui/Card";
import { required } from "@/common/validators";
import Currency from "../../io/Currency";

const PayerInfo = (props: any) => {
  const bill = props.formValues.bill;
  let descriptionText =
    "Please confirm by filling in the name and address of the Payer for your electronic Official Receipt. Click Continue to proceed with payment.";

  const handleClickNext = async () => {
    console.log("bill => ", bill);
    console.log("Email => ", props.formValues.email);
    console.log("Phone => ", props.formValues.phone);
    console.log("Payer Name => ", props.formValues.payername);
    console.log("Payer Address => ", props.formValues.payeraddress);
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
            amount={bill.amount || 0}
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
          Next
        </Button>
      </ActionBar>
    </Card>
  );
};

export default PayerInfo;
