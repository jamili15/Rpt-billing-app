// EmailVerification.tsx

"use client";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import { Field, Form } from "react-final-form";
import PaymentInfoController from "./PayerInfoController";

interface PaymentInfoProps {
  moduleTitle: string;
  subTitle?: string;
  description?: string;
  onChangeAccount?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
  moduleTitle,
  onCancel,
  onSuccess,
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
  } = PaymentInfoController();

  let descriptionText = "Payment Information";
  let subTitleText = "Please fill in the Payer Name and Payer Address";

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
            <form
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
                    Next
                  </LoadingButton>
                </div>
              </>
            </form>
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

export default PaymentInfo;
