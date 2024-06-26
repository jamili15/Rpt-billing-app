import { lookupService } from "@/common/lib/client";
import React, { useRef, useState } from "react";
import { usePartnerContext } from "./PartnerModel";

const useEmailVerification = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [key, setKey] = useState("");
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showEmailValidation, setShowEmailValidation] = useState(false);
  const [showPhoneValidation, setShowPhoneValidation] = useState(false);
  const [showInvalidKey, setShowInvalidKey] = useState(false);
  const [open, setOpen] = useState(false);
  const { channelId } = usePartnerContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = React.useState(false);
  const [connection, setConnection] = useState<string | undefined>();
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const svc = lookupService("OTPService");

  const formatPhoneNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, "");
    let formatted = cleaned.substring(0, 4);
    if (cleaned.length > 4) formatted += `) ${cleaned.substring(4, 7)}`;
    if (cleaned.length > 7) formatted += `-${cleaned.substring(7, 11)}`;
    return formatted ? `(${formatted}` : "";
  };

  const handleEmailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setEmailAddress(input);
    checkFormEmptiness(input, phoneNumber);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(input);
    setIsValidEmail(input.trim() === "" || isValidEmail);
    setShowEmailValidation(!isEmailFocused && !isValidEmail);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const cursorPosition = e.target.selectionStart;

    const formattedPhoneNumber = formatPhoneNumber(input);
    setPhoneNumber(formattedPhoneNumber);
    checkFormEmptiness(emailAddress, formattedPhoneNumber);

    setTimeout(() => {
      if (phoneInputRef.current) {
        phoneInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const otpInput = e.target.value;
    setOtp(otpInput);
    setShowInvalidKey(false);
  };

  const checkFormEmptiness = (email: string, phone: string) => {
    setIsFormEmpty(email.trim() === "" && phone.trim() === "");
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
    setShowEmailValidation(!isValidEmail);
  };

  const handleEmailClick = async () => {
    setLoading(true);
    setShowPhoneValidation(false);
    const phoneNum = phoneNumber.replace(/\D/g, "");
    if (emailAddress.trim() === "") {
      setShowEmailValidation(true);
      setLoading(false);
      return;
    } else if (phoneNum.length > 0 && phoneNum.length < 11) {
      setShowPhoneValidation(true);
      setLoading(false);
      return;
    } else {
      let conn = connection !== null ? connection : "epayment";
      conn = conn === undefined ? "epayment" : conn;
      const otp = await svc?.invoke("generateOtp", {
        partnerid: channelId,
        contact: { email: emailAddress, phone: phoneNumber },
        connection: conn,
      });
      setKey(otp.key);
      setCurrentStep(2);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleOtpClick = async (onSuccess: any) => {
    setLoading(true);
    if (otp.trim().length !== 6) {
      setShowInvalidKey(true);
      setLoading(false);
      return;
    }
    const res = await svc?.invoke("verifyOtp", {
      key: key,
      otp: otp,
    });
    console.log("res =>", res);
    if (res.error === "Invalid Key Value") {
      setShowInvalidKey(true);
      setLoading(false);
      return;
    }
    onSuccess();
    setLoading(false);
  };

  const handleBackClick = () => {
    if (currentStep === 1) {
      setCurrentStep(1);
    } else if (currentStep === 2) {
      setShowInvalidKey(false);
      setCurrentStep(1);
      setEmailAddress("");
      setPhoneNumber("");
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const otp = await svc?.invoke("generateOtp", {
        partnerid: channelId,
        contact: { email: emailAddress },
      });
      setKey(otp.key);
      setLoading(false);
      setOpen(false);
    } catch (error) {
      console.error("Error resending OTP:", error);
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.emailAddress) {
      errors.emailAddress = "Email is required";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    }
    if (!values.otp) {
      errors.otp = "OTP is required";
    }

    return errors;
  };

  return {
    emailAddress,
    phoneNumber,
    phoneInputRef,
    otp,
    open,
    onSubmit,
    validate,
    currentStep,
    loading,
    isFormEmpty,
    isEmailFocused,
    isValidEmail,
    showEmailValidation,
    showPhoneValidation,
    showInvalidKey,
    handleClickOpen,
    handleClose,
    handleEmailAddressChange,
    handlePhoneNumberChange,
    handleOTPChange,
    handleEmailFocus,
    handleEmailBlur,
    handleEmailClick,
    handleOtpClick,
    handleBackClick,
    handleResendOTP,
    setConnection,
  };
};

export default useEmailVerification;
