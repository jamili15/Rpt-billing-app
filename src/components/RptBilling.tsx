"use client";

import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Form } from "react-final-form";
import RefNo from "./RefNo";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import BillingInfo from "./BillingInfo";
import { useBillingContext } from "@/components/RptContextController";
import AdvancePayBilling from "./AdvancePayBilling";

interface BillInfoProps {
  moduleTitle: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const RptBilling: React.FC<BillInfoProps> = ({
  moduleTitle,
  onCancel,
  onSuccess,
}) => {
  const {
    step,
    loading,
    refno,
    errorMessage,
    error,
    helperText,
    handleNext,
    handleBack,
    handleRefNoChange,
    handleRefNoBlur,
  } = useBillingContext();

  let subTitle = "";
  let description = "";

  if (step === "refno") {
    subTitle = "Initial Information";
    description = "Please enter a valid Tax Declaration No.";
  } else if (step === "advancepaybilling") {
    subTitle = "Initial Information";
    description =
      "The associated ledger is fully paid for the current year. To pay in advance, specify the year and click Next button";
  } else {
    subTitle = "Billing Information";
  }

  const handleNextClick = async () => {
    await handleNext();
    if (!errorMessage && step === "billinfo") {
      onSuccess();
    }
  };

  return (
    <div className="bg-white w-[700px] py-5 flex items-center justify-center rounded-md shadow-md text-[16px]">
      <div className="p-10 w-full">
        <div className="flex flex-col gap-2">
          <h1 className="capitalize text-[26.4px] font-bold ">{moduleTitle}</h1>
          <h2 className="text-green-500 capitalize text-[20.4px] font-bold">
            {subTitle}
          </h2>
          {errorMessage && (
            <p className="text-[#b00020] text-sm text-center bg-[#f5f5dc] p-2 font-[500] rounded border">
              {errorMessage}
            </p>
          )}
          <p className="pb-5">{description}</p>
        </div>

        <Form
          onSubmit={() => {}}
          render={({ handleSubmit }) => (
            <form
              className="flex flex-col items-start justify-start gap-8 w-full"
              onSubmit={handleSubmit}
            >
              {step === "refno" && (
                <div className="relative flex flex-col w-full gap-6">
                  <RefNo
                    onChange={handleRefNoChange}
                    error={error}
                    helperText={helperText}
                    onBlur={handleRefNoBlur}
                  />
                </div>
              )}
              {step === "advancepaybilling" && <AdvancePayBilling />}
              {step === "billinfo" && <BillingInfo />}
              <div className="bg-gray-300 w-full h-[0.5px] mt-8" />
              <div className="flex items-center justify-between px-5 w-full ">
                <Button
                  className="font-bold text-[#6200EE] hover:bg-[#b898e626] px-5"
                  size="medium"
                  onClick={refno.trim() !== "" ? handleBack : onCancel}
                >
                  Back
                </Button>

                <LoadingButton
                  size="medium"
                  onClick={handleNextClick}
                  endIcon={
                    <SendIcon
                      className={`${
                        loading ? "block text-transparent" : "hidden"
                      }`}
                    />
                  }
                  loading={loading}
                  loadingPosition="end"
                  variant="outlined"
                  disabled={refno.trim() === ""}
                  className={`${
                    loading || refno.trim() === ""
                      ? "bg-gray-200 font-bold text-gray-500 !border-none"
                      : "bg-[#6200EE] !text-white font-bold hover:bg-[#7319f0] hover:shadow-[0_3px_6px_0_rgba(0,0,0,0.3)] duration-200"
                  } `}
                >
                  {step === "refno" || step === "advancepaybilling"
                    ? "Next"
                    : "Confirm Payment"}
                </LoadingButton>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default RptBilling;
