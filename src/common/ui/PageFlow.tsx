import * as React from "react";
import { useEffect, useState } from "react";
import { Form as FinalForm } from "react-final-form";
import { isAsync, isFunction } from "../helpers";

type PageFlowProps = {
  title: string;
  initialValues?: Record<string, any>;
  validate?: (
    values: Record<string, any>,
    page: PageFlowPage
  ) => Record<string, any>;
  pages: PageFlowPage[];
  initialStep?: number;
};

type PageFlowPage = {
  name: string;
  caption: string;
  Component: any;
  onSubmit?: (values: Record<string, any>) => Record<string, any> | null;
  onCancel?: () => void;
  validate?: (values: Record<string, any>) => Record<string, any> | null;
};

export const PageFlow: React.FC<PageFlowProps> = ({
  title,
  pages = [],
  validate = (values: Record<string, any>) => ({}),
  initialValues = {},
  initialStep = 0,
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [currentPage, setCurrentPage] = useState(pages[initialStep]);

  let Component = currentPage?.Component;

  useEffect(() => {
    setCurrentPage(() => pages[currentStep]);
  }, [currentStep]);

  const hasError = (errors: Record<string, any>) =>
    Object.keys(errors).length > 0;

  const validateHandler = (values: Record<string, any>) => {
    let errors = validate(values, currentPage!);
    if (hasError(errors)) return errors;
    if (currentPage && currentPage.validate) {
      return currentPage.validate(values);
    }
    return errors;
  };

  const executeStep = async (stepperFunc: any, values = {}) => {
    if (!stepperFunc) return -1;
    let retval = { nextStep: -1 };
    if (isAsync(stepperFunc)) {
      retval = (await stepperFunc(values)) ?? retval;
    } else if (isFunction(stepperFunc)) {
      retval = stepperFunc(values) ?? retval;
    }
    return retval.nextStep;
  };

  const moveNextStep = async (values: Record<string, any>) => {
    const nextStep = await executeStep(currentPage?.onSubmit, values);
    if (nextStep >= 0) {
      setCurrentStep(nextStep);
    } else {
      setCurrentStep(Math.min(currentStep + 1, pages.length - 1));
    }
  };

  const movePrevStep = async (values: Record<string, any>) => {
    const nextStep = await executeStep(currentPage?.onCancel, values);
    if (nextStep >= 0) {
      setCurrentStep(nextStep);
    } else {
      setCurrentStep(Math.max(currentStep - 1, 0));
    }
  };

  const formSubmitHandler = async (values: Record<string, any>) => {
    return await moveNextStep(values);
  };

  if (!currentPage) return <></>;

  return (
    <FinalForm initialValues={initialValues} onSubmit={formSubmitHandler}>
      {({
        handleSubmit,
        form,
        submitting,
        values,
        error,
        submitError,
        hasValidationErrors,
      }) => (
        <form onSubmit={handleSubmit}>
          <Component
            title={title}
            form={form}
            formValues={values}
            error={error || submitError}
            submitting={submitting}
            onSubmit={() => moveNextStep(values)}
            onCancel={() => movePrevStep(values)}
            page={{ name: currentPage.name, caption: currentPage.caption }}
            hasValidationErrors={hasValidationErrors}
          />
        </form>
      )}
    </FinalForm>
  );
};

export default PageFlow;
