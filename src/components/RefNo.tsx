import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import Card from "@/common/ui/Card";
import { lookupService } from "@/common/lib/client";
import { usePartnerContext } from "@/common/components/Email/PartnerModel";
import { Text } from "@/common/io/Text";
import { required } from "@/common/validators";
import { ActionBar } from "@/common/ui/ActionBar";
import { Button } from "@/common/io/Button";
import { Bill } from "@/types";

const RefAccount = (props: any) => {
  const [bill, setBill] = useState<Bill | null>(null);
  const { partner } = usePartnerContext();
  const [error, setError] = useState("");
  const [year, setYear] = React.useState<number | undefined>(2024);
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
      const bill: Bill = await svc?.invoke("getBilling", {
        partnerid: partner?.channelid,
        refno: props.formValues.tdno,
        showdetails: true,
        billtoqtr: qtr,
        billtoyear: year,
      });
      if (!bill || bill.error) {
        setError(bill.error || "");
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

  const handleChangeYear = (event: SelectChangeEvent) => {
    const selectedYear = Number(event.target.value);
    setYear(selectedYear);
    if (selectedYear >= fromYear && selectedYear <= 2028) {
      setQtr(4);
    } else {
      setQtr(bill?.fromqtr);
    }
  };

  const fromYear = bill?.fromyear ? Number(bill.fromyear) : 2025;
  const billYear = [];
  for (let i = fromYear; i <= 2028; i++) {
    billYear.push(i);
  }

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
          <div className="w-full flex flex-col gap-3 pt-5">
            <div className="flex gap-20 pb-3">
              <h1>Tax Declaration No.</h1>
              <p>{bill?.tdno}</p>
            </div>
            <div className="w-full border-b-2 border-black" />
            <div className="w-[50%]">
              <div className="flex gap-5 items-center">
                <h1>Advance year to pay</h1>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-label">
                      Bill to Year
                    </InputLabel>
                    <Select
                      value={year?.toString() ?? ""}
                      onChange={handleChangeYear}
                      label="Bill to Year"
                    >
                      {billYear.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
          </div>
          <ActionBar>
            <Button
              onClick={() => setShowAdvancePay(false)}
              variant="text"
              className="font-bold text-[#6200EE] bg-white hover:bg-[#b898e626] px-5"
            >
              Back
            </Button>
            <Button
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
