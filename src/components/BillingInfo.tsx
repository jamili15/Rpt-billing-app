"use client";

import React from "react";
import Currency from "./ui/Currency";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useBillingContext } from "@/components/RptContextController";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { usePartnerContext } from "@/common/components/PartnerModel";
import { lookupService } from "@/common/lib/client";
import Bill from "@/model/Bill";
import CircularProgress from "@mui/material/CircularProgress";

interface BillProps {
  refno: string;
}

const BillingInfo: React.FC<BillProps> = ({ refno }) => {
  const {
    open,
    loading,
    bill,
    handleOpen,
    handleClose,
    setBill,
    setOpen,
    setLoading,
  } = useBillingContext();
  const [qtr, setQtr] = React.useState(4);
  const [year, setYear] = React.useState(2024);
  const { channelId } = usePartnerContext();
  const svc = lookupService("RealTaxBillingService");

  const handleChangeQtr = (event: SelectChangeEvent) => {
    setQtr(Number(event.target.value));
  };

  const handleChangeYear = (event: SelectChangeEvent) => {
    setYear(Number(event.target.value));
  };

  const inputConfigs = [
    { value: bill?.billno, label: "Bill No.", id: "billno" },
    { value: bill?.billdate, label: "Bill Date", id: "billdate" },
    { value: bill?.tdno, label: "TD No.", id: "tdno" },
    { value: bill?.fullpin, label: "PIN", id: "pin" },
    { value: bill?.name, label: "Property Owner", id: "owner" },
    { value: bill?.address, label: "Address", id: "address" },
    {
      value: bill?.billperiod,
      label: "Billing Period",
      id: "period",
    },
    {
      value: <Currency amount={bill?.amount ?? 0} currency="Php" />,
      label: "Amount Due",
      id: "amountDue",
    },
  ];

  const handleSubmit = async () => {
    if (!qtr || !year) {
      alert("Please select both quarter and year.");
      return;
    }
    const refno = bill?.tdno;
    setLoading(true);
    try {
      const res = await svc?.invoke("getBilling", {
        partnerid: channelId,
        refno: refno,
        billtoqtr: qtr,
        billtoyear: year,
      });
      setBill(new Bill(res));
      handleClose();
    } catch (error) {
      console.error("Error submitting billing information:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-start items-center">
        <div className="w-full ">
          {inputConfigs.map((config, index) => (
            <label key={index} htmlFor={config.id} className="w-full relative">
              <p className="text-gray-400 text-sm">{config.label}</p>
              <input
                type="text"
                className="border-b w-full border-black bg-transparent"
                value={typeof config.value === "string" ? config.value : ""}
                id={config.id}
                name={config.id}
                disabled
              />
              <div className=" absolute top-10">
                {typeof config.value !== "string" && config.value}
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <Button
            className="shadow-md border border-[#335f96] mt-5"
            variant="contained"
            size="small"
            onClick={handleOpen}
          >
            Pay option
          </Button>
        </div>

        <Modal open={open} onClose={handleClose}>
          <Box className="fixed flex flex-col gap-3 items-center justify-start top-1/2 left-1/2 w-64 h-52 bg-white shadow-xl p-4 transform -translate-x-1/2 -translate-y-1/2 rounded-sm ">
            <Typography variant="h6" component="h2">
              Pay Options
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Bill to Quarter
                </InputLabel>
                <Select
                  value={qtr.toString()}
                  onChange={handleChangeQtr}
                  label="Bill to Quarter"
                  className="h-10"
                >
                  <MenuItem value={1}>Q1</MenuItem>
                  <MenuItem value={2}>Q2</MenuItem>
                  <MenuItem value={3}>Q3</MenuItem>
                  <MenuItem value={4}>Q4</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Bill to Year
                </InputLabel>
                <Select
                  value={year.toString()}
                  onChange={handleChangeYear}
                  label="Bill to Quarter"
                  className="h-10"
                >
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2025}>2025</MenuItem>
                  <MenuItem value={2026}>2026</MenuItem>
                  <MenuItem value={2027}>2027</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{ minWidth: 220 }}
              className="flex items-end justify-end gap-2"
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
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default BillingInfo;
