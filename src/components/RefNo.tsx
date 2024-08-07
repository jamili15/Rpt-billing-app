import { Box, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import Card from "@/common/ui/Card";
import { lookupService } from "@/common/lib/client";
import { usePartnerContext } from "@/common/components/Email/PartnerModel";
import { Text } from "@/common/io/Text";
import { required } from "@/common/validators";
import { ActionBar } from "@/common/ui/ActionBar";
import { Button } from "@/common/io/Button";
import { Bill } from "@/types";
import { timeout } from "@/common/helpers";

const RefAccount = (props: any) => {
  const [bill, setBill] = useState<Bill | null>(null);
  const { partner } = usePartnerContext();
  const [error, setError] = useState("");
  const [newError, setNewError] = useState("");
  const [year, setYear] = React.useState<number | undefined>(2025);
  const [manualYear, setManualYear] = React.useState<string>("2025");
  const [qtr, setQtr] = React.useState<number | undefined>(4);
  const [loading, setLoading] = useState(false);
  const [showAdvancePay, setShowAdvancePay] = useState(false);
  const svc = lookupService("RealTaxBillingService");

  let descriptionText = showAdvancePay
    ? "The associated ledger is fully paid for the current year. To pay in advance, specify the year and click Next button."
    : "Please enter a valid Tax Declaration No.";

  const handleClickNext = async () => {
    setLoading(true);
    try {
      await timeout(2);
      const bill: Bill = await svc?.invoke("getBilling", {
        partnerid: partner?.channelid,
        refno: props.formValues.tdno,
        showdetails: true,
      });

      if (!bill || bill?.error) {
        setError(bill?.error || "An unknown error occurred");
        if (bill?.error === "There are no unpaid items found.") {
          setShowAdvancePay(true);
          setLoading(false);
          return;
        } else {
          setShowAdvancePay(false);
        }
      } else {
        props.form.change("bill", bill);
        props.onSubmit();
        setError("");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancePayNext = async () => {
    setLoading(true);
    try {
      await timeout(2);
      const bill: Bill = await svc?.invoke("getBilling", {
        partnerid: partner?.channelid,
        refno: props.formValues.tdno,
        showdetails: true,
        billtoqtr: qtr,
        billtoyear: year,
      });
      if (!bill || bill.error) {
        setError(bill.error || "");
        if (bill.error === "There are no unpaid items found.") {
          setNewError("Advance year should be greater than or equal to 2025");
        } else if (bill.error === "Bill To Year must not exceed year null.") {
          setNewError(bill.error);
        }
      } else {
        props.onSubmit();
        props.form.change("bill", bill);
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setManualYear(value);
    const numericValue = Number(value);
    if (!isNaN(numericValue) && numericValue >= 2015) {
      setYear(numericValue);
      setQtr(4);
    } else {
    }
  };

  const loadData = async () => {
    const bill: Bill = await svc?.invoke("getBilling", {
      partnerid: partner?.channelid,
      refno: props.formValues.tdno,
      showdetails: true,
      billtoqtr: qtr,
      billtoyear: year,
    });
    setBill(bill);
  };

  return (
    <Card
      title={props.title}
      subTitleText={props.page.caption}
      description={descriptionText}
      error={error}
    >
      {showAdvancePay ? (
        <>
          <div className="w-full flex flex-col gap-3 pt-5 relative">
            <div className="flex gap-20 pb-3">
              <h1>Tax Declaration No.</h1>
              <p>{bill?.tdno}</p>
            </div>
            <div className="w-full border-b-2 border-black " />
            <div className="w-[60%]">
              <div className="flex gap-5 items-center ">
                <h1>Advance year to pay</h1>
                <TextField
                  variant="outlined"
                  value={manualYear}
                  onChange={handleManualYearChange}
                  className="w-[120px]"
                  type="number"
                  size="small"
                  required
                  autoComplete="off"
                />
                <p className="text-[#B00020] text-[12px] absolute top-22 right-0">
                  {newError}
                </p>
              </div>
            </div>
          </div>
          <ActionBar>
            <Button
              onClick={() => {
                props.form.change("tdno", "");
                setShowAdvancePay(false);
                setError("");
              }}
              variant="text"
              className="font-bold text-[#6200EE] bg-white hover:bg-[#b898e626] px-5"
            >
              Back
            </Button>
            <Button
              type="submit"
              onClick={handleAdvancePayNext}
              disabled={props.hasValidationErrors || loading}
            >
              Next
              {loading ? <CircularProgress thickness={5} size={24} /> : ""}
            </Button>
          </ActionBar>
        </>
      ) : (
        <>
          <Text
            name="tdno"
            label="Tax Declaration No."
            validate={required}
            variant="standard"
            required
            autoComplete="off"
          />
          <ActionBar>
            <Button
              onClick={() => {
                props.onCancel?.();
                props.form.reset();
              }}
              variant="text"
              className="font-bold text-[#6200EE] bg-white hover:bg-[#b898e626] px-5"
            >
              Back
            </Button>
            <Button
              type="submit"
              onClick={() => {
                handleClickNext();
                loadData();
              }}
              disabled={props.hasValidationErrors || loading}
            >
              Next
              {loading ? <CircularProgress thickness={5} size={24} /> : ""}
            </Button>
          </ActionBar>
        </>
      )}
    </Card>
  );
};

export default RefAccount;
