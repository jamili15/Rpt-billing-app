import React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { lookupService } from "@/common/lib/client";
import { Bill } from "@/types";
import { usePartnerContext } from "@/common/components/Email/PartnerModel";

interface AdvancePayBillingProps {}

const AdvancePayBilling: React.FC<AdvancePayBillingProps> = (props: any) => {
  const bill = props.formValues.bill;
  const { partner } = usePartnerContext();
  const svc = lookupService("RealTaxBillingService");

  const [year, setYear] = React.useState(2025);

  const handleChangeYear = async (event: SelectChangeEvent) => {
    const newYear = Number(event.target.value);
    setYear(newYear);
    await handlePayYearChange(newYear);
  };

  const handlePayYearChange = async (year: number) => {
    const refno = bill?.info.tdno;
    try {
      const res: Bill = await svc?.invoke("getBilling", {
        partnerid: partner?.channelid,
        refno: refno,
        billtoyear: year,
      });
      props.form.change("bill", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex gap-20 pb-3">
        <h1>Tax Declaration No.</h1>
        <p>{bill?.tdno}</p>
      </div>
      <div className="w-full border-b-2 border-black" />
      <div className="w-[50%]">
        <div className="flex gap-5 items-center">
          <h1>Advance year to pay</h1>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Bill to Year
              </InputLabel>
              <Select
                value={year.toString()}
                onChange={handleChangeYear}
                label="Bill to Year"
                className="h-10"
              >
                <MenuItem value={2025}>2025</MenuItem>
                <MenuItem value={2026}>2026</MenuItem>
                <MenuItem value={2027}>2027</MenuItem>
                <MenuItem value={2028}>2028</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AdvancePayBilling;
