import { Button } from "@/common/io/Button";
import { Email } from "@/common/io/Email";

import { Text } from "@/common/io/Text";
import { lookupService } from "@/common/lib/client";
import { ActionBar } from "@/common/ui/ActionBar";
import Card from "@/common/ui/Card";
import Dialog from "@/common/ui/Dialog";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { required, validateEmail } from "../../validators";
import { usePartnerContext } from "./PartnerModel";

// type PageFlowProps = {
//   formValues: Record<string, any>;
//   form: any;
// };

// type EmailVerificationProps = {
//   caption?: string;
// } & PageFlowProps;

const EmailVerification = (props: any) => {
  const { channelId } = usePartnerContext();
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
      const otp = await svc?.invoke("generateOtp", {
        partnerid: channelId,
        contact: {
          email: props.formValues.email,
          phone: props.formValues.phone,
        },
      });
      props.form.change("otp", otp);
      setMode("otp");
      setOpen(false);
    } catch (error) {
      console.log("error => ", error);
    }
    setLoading(false);
  };

  const handleOtpNext = async () => {
    try {
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
        />
        <Text
          name="phone"
          label="Phone Number"
          placeholder="(0000) 000-0000"
          variant="standard"
        />
        <ActionBar>
          <Button
            onClick={props.movePrevStep}
            variant="text"
            className="font-bold text-[#6200EE] bg-white hover:bg-[#b898e626] px-5"
          >
            Back
          </Button>
          <Button
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
        />
        <Button
          className="flex bg-white hover:bg-transparent mt-5 text-gray-500"
          onClick={handleDialog}
        >
          Resend OTP
        </Button>
        <Dialog open={open} close={handleDialog} confirm={handleEmailNext} />
        <ActionBar>
          <Button
            onClick={handleBack}
            variant="text"
            className="font-bold text-[#6200EE] bg-white hover:bg-[#b898e626] px-5"
          >
            Back
          </Button>
          <Button onClick={handleOtpNext} disabled={props.hasValidationErrors}>
            Next
          </Button>
        </ActionBar>
      </Card>
    );
  }

  return null;
};

export default EmailVerification;
