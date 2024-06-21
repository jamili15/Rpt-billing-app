"use client";

import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import React, { useEffect } from "react";
import { Field, Form } from "react-final-form";
import useEmailVerification from "./EmailVerificationController";

interface EmailVerificationUiProps {
  moduleTitle: string;
  onSuccess: () => void;
  connection?: string;
  subTitle?: string;
  description?: string;
  emailaddress?: string;
  onChangeEmail?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BouncedTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "showEmailValidation",
})<{ showEmailValidation: boolean }>(({ showEmailValidation }) => ({
  "& .MuiFormLabel-root": {
    transition: "color 0.2s, transform 0.2s",
    ...(showEmailValidation && {
      animation: "bounce 0.2s ease-in-out 1.5",
      color: "#b00020",
    }),
  },
}));

const EmailVerification: React.FC<EmailVerificationUiProps> = ({
  moduleTitle,
  connection,
  onSuccess,
}) => {
  const {
    emailAddress,
    phoneNumber,
    otp,
    isFormEmpty,
    isValidEmail,
    open,
    onSubmit,
    validate,
    currentStep,
    loading,
    showEmailValidation,
    showInvalidKey,
    handleEmailAddressChange,
    handlePhoneNumberChange,
    handleOTPChange,
    handleEmailFocus,
    handleEmailBlur,
    handleEmailClick,
    handleOtpClick,
    handleBackClick,
    handleClickOpen,
    handleClose,
    handleResendOTP,
    setConnection,
  } = useEmailVerification();

  useEffect(() => {
    setConnection(connection);
  }, []);

  const handleClick = () => {
    handleOtpClick(onSuccess);
  };

  let descriptionText = "";
  let subTitleText = "";

  if (currentStep === 1) {
    descriptionText =
      "A validation key will be sent to your email or mobile phone. Please make sure your email is valid and you have access to it.";
    subTitleText = "Email Verification";
  } else if (currentStep === 2) {
    descriptionText =
      "Please check your email inbox or spam folder for the sent 6-digit validation key. If you have not received any Email Verification, please click resend code.";
    subTitleText = "Email Verification";
  }

  const ariaLabel = { "aria-label": "description" };

  return (
    <div className="bg-white w-[700px] py-5 flex items-center justify-center rounded-md shadow-md text-[16px]">
      <div className="p-10 w-full">
        <div className="flex flex-col gap-2 pb-2">
          <h1 className="capitalize text-[26.4px] font-bold ">{moduleTitle}</h1>
          <h2 className="text-green-500 capitalize text-[20.4px] font-bold">
            {subTitleText}
          </h2>
          {showInvalidKey && (
            <p className="text-[#b00020] text-sm text-center bg-[#f5f5dc] p-2 rounded border">
              Invalid Key Value
            </p>
          )}
          <p>{descriptionText}</p>
        </div>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form
              className="flex flex-col items-start justify-start gap-5"
              onSubmit={handleSubmit}
            >
              <div className="relative flex flex-col w-full gap-6">
                {currentStep === 1 && (
                  <>
                    <Field
                      name="emailAddress"
                      render={({ input, meta }) => (
                        <BouncedTextField
                          {...input}
                          error={showEmailValidation}
                          value={emailAddress}
                          onChange={handleEmailAddressChange}
                          onFocus={handleEmailFocus}
                          onBlur={handleEmailBlur}
                          id="standard-basic"
                          label="Email Address"
                          variant="standard"
                          required
                          helperText={
                            showEmailValidation ? "Incorrect entry." : ""
                          }
                          showEmailValidation={showEmailValidation}
                        />
                      )}
                    />
                    <Field
                      name="phoneNumber"
                      render={({ input, meta }) => (
                        <TextField
                          {...input}
                          placeholder="(0000) 000-0000"
                          label="Mobile No."
                          variant="standard"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                          inputProps={ariaLabel}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          className="w-full"
                        />
                      )}
                    />
                  </>
                )}
                {currentStep === 2 && (
                  <div className="!w-full">
                    <Field
                      name="otp"
                      render={({ input, meta }) => (
                        <div>
                          <TextField
                            {...input}
                            value={otp}
                            onChange={handleOTPChange}
                            id="otp"
                            label="OTP"
                            variant="standard"
                            className="w-full"
                            required
                          />
                        </div>
                      )}
                    />

                    <div className="!w-full">
                      <Button
                        className="float-right hover:bg-transparent mt-5 text-gray-500"
                        onClick={handleClickOpen}
                      >
                        Resend OTP
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title" className="pr-32">
                          Email Verification
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Resend OTP?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleClose}
                            className="text-[#6200EE] hover:bg-[#b898e626]"
                            size="small"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleResendOTP}
                            className="bg-[#6200EE] hover:bg-[#7319f0] !text-white"
                            autoFocus
                            size="small"
                            variant="contained"
                          >
                            OK
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>
                )}
              </div>
              <>
                <div className="bg-gray-300 w-full h-[0.5px] mt-8" />
                <div className="flex items-center justify-between px-5 w-full ">
                  <Button
                    className="font-bold text-[#6200EE] hover:bg-[#b898e626] px-5"
                    size="medium"
                    onClick={handleBackClick}
                  >
                    Back
                  </Button>
                  <LoadingButton
                    size="medium"
                    onClick={currentStep === 1 ? handleEmailClick : handleClick}
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
                    disabled={
                      isFormEmpty ||
                      !isValidEmail ||
                      (currentStep === 2 && otp.length !== 6)
                    }
                    className={`${
                      isFormEmpty ||
                      loading ||
                      (currentStep === 2 && otp.length !== 6)
                        ? "bg-gray-200 font-bold text-gray-500 !border-none"
                        : "bg-[#6200EE] !text-white font-bold hover:bg-[#7319f0] hover:shadow-[0_3px_6px_0_rgba(0,0,0,0.3)] duration-200"
                    }`}
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

export default EmailVerification;
