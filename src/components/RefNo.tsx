import { CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/system";
import Card from "@/common/ui/Card";
import { lookupService } from "@/common/lib/client";
import { usePartnerContext } from "@/common/components/Email/PartnerModel";
import { Text } from "@/common/io/Text";
import { required } from "@/common/validators";
import { ActionBar } from "@/common/ui/ActionBar";
import { Button } from "@/common/io/Button";
import { Bill } from "@/types";

const RefAccount = (props: any) => {
  const { partner } = usePartnerContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const svc = lookupService("RealTaxBillingService");

  let descriptionText = "Please enter a valid Tax Declaration No.";

  const handleClickNext = async () => {
    try {
      const bill: Bill = await svc?.invoke("getBilling", {
        partnerid: partner?.channelid,
        refno: props.formValues.tdno,
        showdetails: true,
      });
      console.log("Bill REF", bill);
      if (!bill || bill.error) {
        setError(bill.error);
      } else {
        props.form.change("bill", bill);
        props.onSubmit();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title={props.title}
      subTitleText={props.page.caption}
      description={descriptionText}
      error={error}
    >
      <Text
        name="tdno"
        label="Tax Declaration No."
        validate={required}
        variant="standard"
        required
      />
      <ActionBar>
        <Button
          onClick={props.onCancel}
          variant="text"
          className="font-bold text-[#6200EE] bg-white hover:bg-[#b898e626] px-5"
        >
          Back
        </Button>
        <Button
          onClick={handleClickNext}
          disabled={props.hasValidationErrors || loading}
        >
          Next
          {loading ? <CircularProgress thickness={5} size={24} /> : ""}
        </Button>
      </ActionBar>
    </Card>
  );
};

export default RefAccount;
