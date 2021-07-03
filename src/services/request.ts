import Taro from "@tarojs/taro";

interface IRequest {
  baseUrl: string;
  url: string;
  method: any;
  params?: object;
  query?: object; //post请求需要拼接到url上的参数
  showLoading?: boolean;
}

export const BASE_URL = window.origin;

/**
 * Taro.request
 */
export const httpRequest = (data: IRequest) => {
  const { baseUrl, url, method, params, query, showLoading = false } = data;

  if (showLoading) {
    Taro.showLoading({
      title: "请稍后",
    });
  }
  let newUrl = url;
  let urlQuery = "";

  // 拼接post params
  if (query && Object.keys(query).length > 0) {
    Object.keys(query).forEach((key) => {
      const item = `&${key}=${query[key]}`;
      urlQuery += item;
    });
    newUrl = url + "?" + urlQuery.substr(1);
  }

  // e: /get/user/:userId
  if (query && Object.keys(query).length > 0) {
    for (let key of Object.keys(query)) {
      newUrl = newUrl.replace(":" + key, (match) => {
        if (match) {
          let value = query[key];
          return value;
        }
      });
    }
  }

  return new Promise((resolve, reject) => {
    Taro.request({
      url: baseUrl + newUrl,
      data: params,
      method: method.toUpperCase(),
      header: {
        "content-type": "application/json",
      },
    })
      .then(async (res: any) => {
        console.log(`${url} 请求结束 ===> ${res}`);
        showLoading && Taro.hideLoading();
        return resolve(res.data);
      })
      .catch((err) => {
        console.error(`${url} 请求失败 ===> ${err}`);
        showLoading && Taro.hideLoading();
        Taro.showToast({
          title: "网络繁忙，请稍后再试",
          icon: "none",
        });
        return reject(err);
      });
  });
};

const call = function (
  reqStr: string,
  params?: any,
  query?: object,
  showLoading?: boolean,
) {
  const [method, url, baseUrl = BASE_URL] = reqStr.split(" ");

  return httpRequest({
    baseUrl,
    url: url,
    method,
    params,
    query,
    showLoading,
  });
};

export default call;
