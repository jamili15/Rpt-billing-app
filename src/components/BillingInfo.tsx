import React, { useState } from "react";
import Currency from "./ui/Currency";
import { Button } from "@/common/io/Button";
import Modal from "@/common/ui/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { lookupService } from "@/common/lib/client";
import CircularProgress from "@mui/material/CircularProgress";
import { usePartnerContext } from "@/common/components/Email/PartnerModel";
import { Bill } from "@/types";
import { Label } from "@/common/io/Label";
import Card from "@/common/ui/Card";
import { ActionBar } from "@/common/ui/ActionBar";

const BillingInfo = (props: any) => {
  const bill = props.formValues.bill;
  const [qtr, setQtr] = React.useState<number | undefined>(bill?.info.toqtr);
  const [year, setYear] = React.useState<number | undefined>(bill?.info.toyear);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { partner } = usePartnerContext();
  const svc = lookupService("RealTaxBillingService");

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChangeQtr = (event: SelectChangeEvent) => {
    setQtr(Number(event.target.value));
  };

  const handleChangeYear = (event: SelectChangeEvent) => {
    const selectedYear = Number(event.target.value);
    setYear(selectedYear);
    if (selectedYear >= fromYear && selectedYear <= 2028) {
      setQtr(4);
    } else {
      setQtr(bill?.info.fromqtr);
    }
  };

  const fromYear = Number(bill?.info.fromyear);
  const billYear = [];
  for (let i = fromYear; i <= 2028; i++) {
    billYear.push(i);
  }

  const fromQtr = Number(bill?.info.fromqtr);
  const billQtr = [];
  if (year === bill?.info.fromyear) {
    for (let q = fromQtr; q <= 4; q++) {
      billQtr.push(q);
    }
  } else {
    billQtr.push(1, 2, 3, 4);
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res: Bill = await svc?.invoke("getBilling", {
        partnerid: partner?.channelid,
        refno: bill?.info.tdno,
        billtoqtr: qtr,
        billtoyear: year,
      });

      console.log("RES", res);
      if (!res || res.error) {
        setError(res.error);
        setOpen(false);
      } else {
        props.form.change("bill", res);
        setOpen(false);
        setError(res.error);
      }
    } catch (error) {
      console.error("Error submitting billing information:", error);
    } finally {
      setLoading(false);
    }
  };

  const dataInfo = (bill: Bill) => [
    {
      value: bill?.info.billno,
      label: "Bill No.",
    },
    {
      value: bill?.info.billdate,
      label: "Bill Date",
    },
    { value: bill?.info.tdno, label: "TD No." },
    { value: bill?.info.fullpin, label: "PIN" },
    {
      value: bill?.info.taxpayer.name,
      label: "Property Owner",
    },
    {
      value: bill?.info.taxpayer.address,
      label: "Address",
    },
    {
      value: bill?.info.billperiod,
      label: "Billing Period",
    },
    {
      value: <Currency amount={bill?.info.amount ?? 0} currency="Php" />,
      label: "Amount Due",
    },
  ];

  console.log("BILL INFO", bill);

  return (
    <Card title={props.title} subTitleText={props.page.caption} error={error}>
      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-col justify-center gap-y-2">
          {dataInfo(props.formValues.bill).map((config, index) => {
            if (typeof config.value === "string") {
              return (
                <Label
                  key={index}
                  name={""}
                  caption={config.label}
                  value={config.value}
                />
              );
            } else {
              return (
                <label key={index} className="w-full relative">
                  <p className="text-gray-400 text-sm">{config.label}</p>
                  <div
                    key={index}
                    className="border-b w-full border-black bg-transparent"
                  >
                    {config.value}
                  </div>
                </label>
              );
            }
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          className="!border border-solid shadow-sm  bg-transparent text-[#6200ee] hover:bg-[#6200ee12] hover:shadow-md mt-6 w-[17%]"
          variant="contained"
          size="small"
          onClick={handleOpen}
        >
          Pay option
        </Button>

        <Modal open={open} onClose={handleOpen}>
          <Typography variant="h6" component="h2">
            Pay Options
          </Typography>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Bill to Year</InputLabel>
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

          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">
              Bill to Quarter
            </InputLabel>
            <Select
              value={qtr?.toString() ?? ""}
              onChange={handleChangeQtr}
              label="Bill to Quarter"
            >
              {billQtr.map((qtr) => (
                <MenuItem key={qtr} value={qtr}>
                  {qtr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            sx={{ minWidth: 230 }}
            className="flex items-end justify-end gap-2 pt-5"
          >
            <Button
              className="bg-transparent shadow-none text-[#6300ee] hover:bg-[#6300ee10] hover:shadow-sm"
              variant="contained"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="shadow-sm border border-[#6300ee] bg-[#6300ee22] text-[#6200ee] hover:bg-[#6300ee32] hover:shadow-md"
              variant="contained"
              size="small"
              onClick={handleSubmit}
            >
              {loading ? <CircularProgress size={20} /> : "Submit"}
            </Button>
          </Box>
        </Modal>
      </div>
      <ActionBar className="justify-between mt-12 relative">
        <div className=" bg-gray-300 absolute bottom-14 h-[1px] w-full" />
        <Button
          onClick={props.onCancel}
          variant="text"
          className="font-bold text-[#6200EE] bg-white hover:bg-[#b898e626] px-5"
        >
          Back
        </Button>
        <Button onClick={props.onSubmit}>Confirm Payment</Button>
      </ActionBar>
    </Card>
  );
};

export default BillingInfo;
