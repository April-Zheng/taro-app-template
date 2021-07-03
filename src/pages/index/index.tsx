import React from "react";
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";
import { useStorage } from "@/hooks";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.scss";

export default () => {
  const [storeValue, setValue] = useStorage("username", "Hello");

  return (
    <View className="index">
      <Text>{storeValue}</Text>
      <AtButton type="primary" onClick={() => setValue("username is changed")}>
        I need Taro UI
      </AtButton>
      <Text>Taro UI 支持 Vue 了吗？</Text>
      <AtButton type="primary" circle>
        支持
      </AtButton>
      <Text>共建？</Text>
      <AtButton type="secondary" circle>
        来
      </AtButton>
    </View>
  );
};
