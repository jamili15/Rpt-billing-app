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

const BillingInfo = () => {
  const {
    open,
    loading,
    bill,
    handleOpen,
    handleClose,
    setBill,
    setOpen,
    setLoading,
    setError,
    setErrorMessage,
  } = useBillingContext();

  const [qtr, setQtr] = React.useState<number | undefined>(bill?.toqtr);
  const [year, setYear] = React.useState<number | undefined>(bill?.toyear);
  const { channelId } = usePartnerContext();
  const svc = lookupService("RealTaxBillingService");

  const handleChangeQtr = (event: SelectChangeEvent) => {
    setQtr(Number(event.target.value));
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

  const fromYear = Number(bill?.fromyear);
  const billYear = [];
  for (let i = fromYear; i <= 2028; i++) {
    billYear.push(i);
  }

  const fromQtr = Number(bill?.fromqtr);
  const billQtr = [];
  if (year === bill?.fromyear) {
    for (let q = fromQtr; q <= 4; q++) {
      billQtr.push(q);
    }
  } else {
    billQtr.push(1, 2, 3, 4);
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await svc?.invoke("getBilling", {
        partnerid: channelId,
        refno: bill?.tdno,
        billtoqtr: qtr,
        billtoyear: year,
      });
      if (!res || res.error) {
        setError(true);
        setErrorMessage(res.error);
        setOpen(false);
      } else {
        setBill(new Bill(res));
        handleClose();
        setError(false);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error submitting billing information:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-start items-center">
        <div className="w-full flex flex-col gap-3">
          {[
            {
              value: bill?.billno,
              label: "Bill No.",
              id: "billno",
            },
            {
              value: bill?.billdate,
              label: "Bill Date",
              id: "billdate",
            },
            { value: bill?.tdno, label: "TD No.", id: "tdno" },
            { value: bill?.fullpin, label: "PIN", id: "pin" },
            {
              value: bill?.taxpayername,
              label: "Property Owner",
              id: "owner",
            },
            {
              value: bill?.taxpayeraddress,
              label: "Address",
              id: "address",
            },
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
          ].map((config, index) => (
            <label key={index} htmlFor={config.id} className="w-full relative">
              <p className="text-gray-400 text-sm">{config.label}</p>
              {typeof config.value === "string" ? (
                <input
                  type="text"
                  className="border-b w-full border-black bg-transparent"
                  value={config.value}
                  disabled
                />
              ) : (
                <div className="border-b w-full border-black bg-transparent">
                  {config.value}
                </div>
              )}
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <Button
            className="!border border-solid shadow-sm  bg-transparent text-[#6200ee] hover:bg-[#6200ee12] hover:shadow-md mt-5"
            variant="contained"
            size="small"
            onClick={handleOpen}
          >
            Pay option
          </Button>
        </div>
        <Modal open={open} onClose={handleClose}>
          <Box className="fixed flex flex-col gap-3 items-center justify-start top-1/2 left-1/2 w-64 h-60 bg-white shadow-xl p-4 transform -translate-x-1/2 -translate-y-1/2 rounded-sm ">
            <Typography variant="h6" component="h2">
              Pay Options
            </Typography>

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
              className="flex items-end justify-end gap-2 pt-8"
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
