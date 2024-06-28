import cryptoJs from "crypto-js";

export const isAsync = (func: Function) => {
  return func.constructor.name === "AsyncFunction";
};

export const isPromise = (p: any) => {
  if (isFunction(p) && typeof p.then === "function") {
    return true;
  }
  return false;
};

export const isFunction = (fn: any) => {
  if (!fn) return false;
  return typeof fn === "function";
};

export const isArray = (value: any) => {
  return Array.isArray(value);
};

export function timeout(secs: number) {
  let timeoutId = null;
  return new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      resolve("time");
    }, secs * 1000);
  });
}

export const encryptPwd = (values: string[]) => {
  console.log("encryptPwd", values);
  const encryptedPwd = cryptoJs.MD5(values.join("")).toString();
  console.log("encryptedPwd", encryptedPwd);
  return encryptedPwd;
};
