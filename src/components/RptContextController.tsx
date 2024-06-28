"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { lookupService } from "@/common/lib/client";
import Bill from "@/model/Bill";
import { usePartnerContext } from "@/common/components/PartnerModel";

interface BillingInfoContext {
  loading: boolean;
  step: string;
  validate: boolean;
  errorMessage: string;
  error: boolean;
  open: boolean;
  bill: Bill | null;
  helperText: string | null;
  refno: string;
  setRefno: (value: string) => void;
  setErrorMessage: (value: string) => void;
  setValidate: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setStep: (value: string) => void;
  setBill: (value: Bill | null) => void;
  setOpen: (value: boolean) => void;
  setError: (value: boolean) => void;
  handleClose: () => void;
  handleOpen: () => void;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  handleRefNoChange: (value: string) => void;
  nextButtonDisabled: boolean;
  handleRefNoBlur: () => void;
}

const BillingContext = createContext<BillingInfoContext | undefined>(undefined);

export const BillingInfoProvider = ({ children }: { children: ReactNode }) => {
  const [bill, setBill] = useState<Bill | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<string>("refno");
  const [validate, setValidate] = useState(false);
  const [refno, setRefno] = useState<string>("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [helperText, setHelperText] = useState<string | null>(null);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const { channelId } = usePartnerContext();
  const svc = lookupService("RealTaxBillingService");

  const handleRefNoChange = (value: string) => {
    setRefno(value);
    const trimmedValue = value.trim();

    if (trimmedValue === "") {
      setNextButtonDisabled(true);
      setError(false);
      setErrorMessage("");
    } else {
      setNextButtonDisabled(false);
      setError(false);
      setHelperText(null);
    }
  };

  const handleRefNoBlur = () => {
    if (refno.trim() === "") {
      setHelperText("Value is required");
      setError(true);
    } else {
      setHelperText(null);
      setError(false);
    }
  };

  const handleNext = async () => {
    setLoading(true);
    setError(false);
    setErrorMessage("");
    try {
      const res = await svc?.invoke("getBilling", {
        partnerid: channelId,
        refno: refno,
        billtoqtr: bill?.billtoqtr,
        billtoyear: bill?.billtoyear,
        showdetails: true,
      });

      if (!res || res.error) {
        setErrorMessage(res.error);
        setError(true);
      } else {
        setBill(new Bill(res));
        setStep("billinfo");
      }
    } catch (error) {
      setErrorMessage(
        "Partner is currently not available. Please try again later."
      );
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep("refno");
    setRefno("");
    setErrorMessage("");
    setError(false);
    setNextButtonDisabled(true);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <BillingContext.Provider
      value={{
        loading,
        step,
        validate,
        errorMessage,
        error,
        open,
        bill,
        helperText,
        refno,
        setRefno,
        setErrorMessage,
        setError,
        setValidate,
        setLoading,
        setStep,
        setBill,
        setOpen,
        handleClose,
        handleOpen,
        handleNext,
        handleBack,
        handleRefNoChange,
        nextButtonDisabled,
        handleRefNoBlur,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export const useBillingContext = (): BillingInfoContext => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error("useBillingContext must be used within a BillingProvider");
  }
  return context;
};
