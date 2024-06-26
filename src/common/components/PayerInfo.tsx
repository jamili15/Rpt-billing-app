// EmailVerification.tsx

"use client";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import { Field, Form } from "react-final-form";
import Currency from "./Currency";
import PayerInfoController from "./PayerInfoController";

interface PayerInfoProps {
  moduleTitle: string;
  onSuccess: () => void;
  onCancel: () => void;
  subTitle?: string;
  description?: string;
  onChangeAccount?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  billAmount: number;
}

const PayerInfo: React.FC<PayerInfoProps> = ({
  moduleTitle,
  onCancel,
  billAmount,
}) => {
  const {
    loading,
    onSubmit,
    payerName,
    payerAddr,
    payerNameError,
    payerAddrError,
    handlePayerNameChange,
    handlePayerAddrChange,
    handleNextClick,
  } = PayerInfoController();

  let subTitleText = "Confirm Transaction";
  let descriptionText =
    "Please confirm by filling in the name and address of the Payer for your electronic Official Receipt. Click Continue to proceed with payment.";

  const ariaLabel = { "aria-label": "description" };

  return (
    <div className="bg-white w-[700px] py-5 flex items-center justify-center rounded-md shadow-md text-[16px]">
      <div className="p-10 w-full">
        <div className="flex flex-col gap-2 pb-2">
          <h1 className="capitalize text-[26.4px] font-bold ">{moduleTitle}</h1>
          <h2 className="text-green-500 capitalize text-[20.4px] font-bold">
            {subTitleText}
          </h2>

          <p>{descriptionText}</p>
        </div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <div
              className="flex flex-col items-start justify-start gap-5"
              onSubmit={handleSubmit}
            >
              <div className="relative flex flex-col w-full gap-6">
                <>
                  <Field
                    name="payerName"
                    render={({ input, meta }) => (
                      <TextField
                        {...input}
                        label="Payer Name"
                        variant="standard"
                        value={payerName}
                        onChange={handlePayerNameChange}
                        inputProps={ariaLabel}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        className="w-full"
                        error={payerNameError}
                        helperText={payerNameError && "Enter Payer Name"}
                      />
                    )}
                  />
                  <Field
                    name="payerAddr"
                    render={({ input, meta }) => (
                      <TextField
                        {...input}
                        label="Payer Address"
                        variant="standard"
                        value={payerAddr}
                        onChange={handlePayerAddrChange}
                        inputProps={ariaLabel}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        className="w-full"
                        error={payerAddrError}
                        helperText={payerAddrError && "Enter Payer Address"}
                      />
                    )}
                  />
                  <div className="flex flex-col justify-center items-center gap-y-4">
                    <p>Payment Details</p>
                    <div className="w-full border border-black font-bold p-4">
                      <Currency
                        classname="flex justify-center"
                        currency="Php"
                        amount={billAmount || 0}
                      />
                    </div>
                  </div>
                </>
              </div>
              <>
                <div className="bg-gray-300 w-full h-[0.5px] mt-8" />
                <div className="flex items-center justify-between px-5 w-full ">
                  <Button
                    className="font-bold text-[#6200EE] hover:bg-[#b898e626] px-5"
                    size="medium"
                    onClick={onCancel}
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
                    className="bg-[#6200EE] !text-white font-bold hover:bg-[#7319f0] hover:shadow-[0_3px_6px_0_rgba(0,0,0,0.3)] duration-200"
                  >
                    Continue
                  </LoadingButton>
                </div>
              </>
            </div>
          )}
        />
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateX(-2px);
          }
          50% {
            transform: translateX(2px);
          }
        }
      `}</style>
    </div>
  );
};

export default PayerInfo;
