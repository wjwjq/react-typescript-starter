import axios, { AxiosPromise } from 'axios';

interface IPostedData {
  data?: any;
  [propName: string]: any;
}

type TMethod = 'GET' | 'PUT' | 'DELETE' | 'POST';

const instance = axios.create();
instance.defaults.withCredentials = true;

function get(url: string, postedData: IPostedData = {}) {
  return networkCall(instance(url, judgePostedData('GET', postedData)));
}

function post(url: string, postedData: IPostedData = {}) {
  return networkCall(instance(url, judgePostedData('POST', postedData)));
}

function put(url: string, postedData: IPostedData = {}) {
  return networkCall(instance(url, judgePostedData('PUT', postedData)));
}

function del(url: string, postedData: IPostedData = {}) {
  return networkCall(instance(url, judgePostedData('DELETE', postedData)));
}

async function all(axiosPromiseArray: Array<Promise<any>>) {
  try {
    return await Promise.all(axiosPromiseArray);
  } catch (error) {
    console.info('axios all error', error);
    return Promise.reject(error);
  }
}

async function networkCall(axiosPromise: AxiosPromise) {
  let resData = null;
  try {
    const response = await axiosPromise;
    resData = await response.data;
    const { status } = resData;

    if (+status === 200) { // 请求成功
      return await resData.data;
    } else if (+status === 403) { // 验证失败
      // store.dispatch({
      //   type: AUTH_FAIL
      // });
    } else { // 请求失败
      return Promise.reject({
        status,
        reason: resData.reason
      });
    }

  } catch (error) { // 请求异常  status !== 200
    globalAxiosErrorHandler(Object.assign({}, error.response.data, {
      method: error.config.method
    }));
  }
}

function globalAxiosErrorHandler(errResponse: any) {
  const host = window.location.origin;
  const {
    timestamp,
    status,
    error,
    path,
    method
  } = errResponse;

  console.error(`${dateFormat(timestamp)}  ${method.toUpperCase()}: ${host}${path}  ${status} (${error})`);
}

function dateFormat(date: string | Date) {
  if (!date) {
    throw new Error(`argument 'date' is required`);
  }
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  let fmt = 'yyyy-MM-dd hh:mm:ss';
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (const k in o) {
    if (new RegExp(k).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }

  return fmt;
}

function judgePostedData(method: TMethod, postedData: IPostedData) {
  if (method === 'DELETE' || method === 'GET') {
    return {
      method,
      params: postedData
    };
  } else {
    return 'data' in postedData
      ? {
        method,
        ...postedData
      }
      : {
        method,
        data: postedData
      };
  }
}

export default {
  delete: del,
  del,
  get,
  post,
  put,
  all
};
