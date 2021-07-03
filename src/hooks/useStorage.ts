import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";

export const useStorage = (key: string, defaultValue: any) => {
  const [storeValue, setStoreValue] = useState(() => {
    return Taro.getStorageSync(key) || defaultValue;
  });
  const setValue = (value) => {
    Taro.setStorageSync(key, value);
    setStoreValue(value);
  };

  useEffect(() => {
    setStoreValue(Taro.getStorageSync(key) || defaultValue);
  }, [key]);

  return [storeValue, setValue];
};
