import Axios from 'ts-axios-ttn';
import { Message } from 'element-ui';
import { getToken, removeToken } from './auth';
// import router from '../router';
const tokenHeaderName = 'X-ACCESS-TOKEN';

const CancelToken = Axios.CancelToken;
// const cancelList = [];
const source = CancelToken.source();

Axios.interceptors.request.use(
  config => {
    config.headers[tokenHeaderName] = getToken();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default class CommonInterface {
  static fetch = (
    url = '',
    method = 'get',
    data = {},
    baseUrl = '',
    isMessage = true,
    callback = null
  ) => {
    const toMethod = method.toLocaleLowerCase();
    const baseConfig = {
      baseURL: baseUrl ? window.$apiUrl + baseUrl : window.$apiUrl + '/',
      responseType: method === 'download' ? 'blob' : 'json',
      headers: {
        'Content-Type':
          toMethod === 'formPost' ? 'multipart/form-data' : 'application/json'
      }
    };
    baseConfig['headers'][tokenHeaderName] = getToken();
    const config = callback
      ? Object.assign({}, baseConfig, {
          onUploadProgress: progressEvent => {
            if (progressEvent.lengthComputable) {
              callback(progressEvent);
              // 属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
              // 如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
              // var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%';
              // console.log(complete);
            }
          }
        })
      : baseConfig;

    const interfaceSign = url.indexOf('?') > -1 ? '&' : '?';
    const interfaceUrl =
      url + interfaceSign + 'timestamp=' + new Date().getTime();

    let instance = Axios.create(config);
    instance = ['get', 'download'].includes(toMethod)
      ? instance.get(interfaceUrl, {
          params: data,
          // cancelToken: new CancelToken(function executor(c) {
          //   cancelList.push(c);
          // })
          cancelToken: source.token
        })
      : toMethod === 'delete'
      ? instance.delete(interfaceUrl, {
          params: data,
          // cancelToken: new CancelToken(function executor(c) {
          //   cancelList.push(c);
          // })
          cancelToken: source.token
        })
      : toMethod === 'formPost'
      ? instance.post(interfaceUrl, data, {
          // cancelToken: new CancelToken(function executor(c) {
          //   cancelList.push(c);
          // })
          cancelToken: source.token
        })
      : instance[toMethod](interfaceUrl, data, {
          // cancelToken: new CancelToken(function executor(c) {
          //   cancelList.push(c);
          // })
          cancelToken: source.token
        });

    return new Promise((resolve, reject) => {
      return instance
        .then(res => {
          if (toMethod !== 'download') {
            const { data, message } = res;
            const resData = data.data || data;
            resolve(resData);
            isMessage &&
              Message({
                message: message || res.data.message || res.data.msg,
                type: 'success'
              });
          } else {
            const { data, headers } = res;
            const fileName = decodeURI(
              headers['content-disposition']
                .split('filename=')[1]
                .replace(/"/g, '')
            );
            if (
              navigator.userAgent.indexOf('Edge') > -1 ||
              navigator.userAgent.indexOf('NET') > -1
            ) {
              let type = data['type'];
              let blob = new Blob([data], {
                type: type
              });
              if (window.navigator.msSaveBlob) {
                window.navigator.msSaveBlob(blob, fileName);
              }
            } else {
              let url = window.URL.createObjectURL(new Blob([data]));
              let link = document.createElement('a');
              link.style.display = 'none';
              link.href = url;
              link.setAttribute('download', fileName);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }
        })
        .catch(err => {
          reject(err);
          const { status, message } = err || err.data || err.response.data;
          if (status === 401) {
            removeToken();
            // router.replace({
            //   path: '/login'
            // });
          }
          isMessage &&
            Message({
              message: message || err,
              type: 'error'
            });
        });
    });
  };
  constructor(baseUrl, isMessage, callback) {
    this.baseUrl = baseUrl;
    this.isMessage = isMessage;
    this.callback = callback;
  }
  get(url, data) {
    return CommonInterface.fetch(
      url,
      'get',
      data,
      this.baseUrl,
      this.isMessage,
      this.callback
    );
  }
  post(url, data) {
    return CommonInterface.fetch(
      url,
      'post',
      data,
      this.baseUrl,
      this.isMessage,
      this.callback
    );
  }
  formPost(url, data) {
    return CommonInterface.fetch(
      url,
      'formPost',
      data,
      this.baseUrl,
      this.isMessage,
      this.callback
    );
  }
  put(url, data) {
    return CommonInterface.fetch(
      url,
      'put',
      data,
      this.baseUrl,
      this.isMessage,
      this.callback
    );
  }
  delete(url, data) {
    return CommonInterface.fetch(
      url,
      'delete',
      data,
      this.baseUrl,
      this.isMessage,
      this.callback
    );
  }
  download(url, data) {
    return CommonInterface.fetch(
      url,
      'download',
      data,
      this.baseUrl,
      this.isMessage,
      this.callback
    );
  }
  all(list, callback) {
    const axiosList = list.map(item => {
      const { url, method } = item;
      return Axios[method](url);
    });
    Axios.all(axiosList).then(
      Axios.spread(function() {
        callback(Array.from(arguments));
      })
    );
  }
  cancelToken() {
    // for (let i = 0; i < cancelList.length; i++) {
    //   cancelList[i]();
    // }
    source.cancel();
  }
}

// Axios.interceptors.response.use(
//     response => {
//         return response
//     },
//     error => {
//         if (error.response.status === 401) {
//             removeToken()
//             router.replace({
//                 path: '/login'
//             })
//         }
//         return Promise.reject(error)
//     }
// )
