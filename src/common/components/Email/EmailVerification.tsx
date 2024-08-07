import { Button } from "@/common/io/Button";
import { Email } from "@/common/io/Email";
import { Text } from "@/common/io/Text";
import { lookupService } from "@/common/lib/client";
import { ActionBar } from "@/common/ui/ActionBar";
import Card from "@/common/ui/Card";
import Dialog from "@/common/ui/Dialog";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { required, validateEmail, validatePhone } from "../../validators";
import { usePartnerContext } from "./PartnerModel";
import { timeout } from "@/common/helpers";
import { phoneNumberFormatter } from "@/common/formatter";

// type PageFlowProps = {
//   formValues: Record<string, any>;
//   form: any;
// };

// type EmailVerificationProps = {
//   caption?: string;
// } & PageFlowProps;

const EmailVerification = (props: any) => {
  const { partner } = usePartnerContext();
  const [mode, setMode] = useState<string>("email");
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const svc = lookupService("OTPService");

  let descriptionText =
    "A validation key will be sent to your email or mobile phone. Please make sure your email is valid and you have access to it.";

  const handleEmailNext = async () => {
    setLoading(true);
    try {
      await timeout(1);
      props.form.change("otp", undefined);
      const otp = await svc?.invoke("generateOtp", {
        partnerid: partner?.channelid,
        contact: {
          email: props.formValues.email,
          phone: props.formValues.phone,
        },
      });

      if (!otp || otp.error) {
        setError(otp.error);
      } else {
        props.form.change("otp", otp);
        setMode("otp");
        setOpen(false);
        setError("");
      }
    } catch (error) {
      console.log("error => ", error);
    }
    setLoading(false);
  };

  const handleOtpNext = async () => {
    if (props.hasValidationErrors) {
      return;
    }

    setLoading(true);
    try {
      await timeout(1);
      const otp = props.formValues.otp;
      const res = await svc?.invoke("verifyOtp", {
        key: otp.key,
        otp: props.formValues.enteredOtp,
      });
      if (res.status === "ERROR") {
        setError(res.error);
      } else {
        props.onSubmit();
      }
    } catch (error) {
      console.log("error => ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDialog = () => {
    setOpen(!open);
  };

  const handleBack = () => {
    setMode("email");
    setError("");
  };

  if (mode === "email") {
    return (
      <Card
        key={mode}
        title={props.title}
        subTitleText={props.page.caption}
        description={descriptionText}
        error={error}
      >
        <Email
          name="email"
          label="Email Address"
          validate={validateEmail}
          variant="standard"
          autoComplete="off"
        />
        <Text
          name="phone"
          label="Mobile Number"
          placeholder="(0000) 000-0000"
          variant="standard"
          onChange={(e) =>
            props.form.change("phone", phoneNumberFormatter(e.target.value))
          }
          autoComplete="off"
        />
        <div className="bg-gray-300 w-full h-[0.5px] mt-8" />
        <ActionBar>
          <Button
            onClick={props.movePrevStep}
            variant="text"
            className="font-bold text-[#6200EE] bg-white hover:bg-[#b898e626] px-5"
          >
            Back
          </Button>
          <Button
            type="submit"
            onClick={handleEmailNext}
            disabled={props.hasValidationErrors || loading}
          >
            Next
            {loading ? <CircularProgress thickness={5} size={24} /> : ""}
          </Button>
        </ActionBar>
      </Card>
    );
  }

  if (mode === "otp") {
    return (
      <Card
        key={mode}
        title={props.title}
        subTitleText={props.page.caption}
        description={descriptionText}
        error={error}
      >
        <Text
          name="enteredOtp"
          label="OTP"
          validate={required}
          variant="standard"
          autoComplete="off"
        />
        <div className="flex justify-end mt-5">
          <Button
            className="flex bg-white hover:bg-transparent mt-5 text-gray-500"
            onClick={handleDialog}
            variant="text"
          >
            Resend OTP
          </Button>
        </div>
        <Dialog
          open={open}
          close={handleDialog}
          confirm={handleEmailNext}
          caption={"Email Verification"}
          dialogText="Resend OTP"
        />
        <div className="bg-gray-300 w-full h-[0.5px] mt-8" />
        <ActionBar>
          <Button
            onClick={handleBack}
            variant="text"
            className="font-bold text-[#6200EE] bg-white hover:bg-[#b898e626] px-5"
          >
            Back
          </Button>
          <Button
            type="submit"
            onClick={handleOtpNext}
            disabled={props.hasValidationErrors || loading}
          >
            Next
            {loading ? <CircularProgress thickness={5} size={24} /> : ""}
          </Button>
        </ActionBar>
      </Card>
    );
  }

  return null;
};

export default EmailVerification;
