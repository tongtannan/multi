/***防抖 ***/
export function _debounce(fn) {
  let debounceTime = null;
  return () => {
    clearTimeout(debounceTime);
    debounceTime = setTimeout(() => {
      fn();
    }, 500);
  };
}

/***定时 ***/
export function _init(fn, stopFn, time = 600, stopTime = 0) {
  fn();
  const initTimer = setInterval(() => {
    fn();
  }, 1000 * time);
  stopFn(initTimer);
  stopTime &&
    setTimeout(() => {
      clearInterval(initTimer);
      return Promise.resolve();
    }, 1000 * stopTime);
}

export function getArray(num, item) {
  return Array.from({ length: num }, () => item);
}

export function deepClone(obj, hash = new WeakMap()) {
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  const t = new obj.constructor();
  hash.get(obj, t);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      t[key] = deepClone(obj[key], hash);
    }
  }
  return t;
}

export function flatArr(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    }
    {
      res.push(next);
    }
  }
  return res.reverse();
}

export function jsonp(url, params, callback) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    window[callback] = function(data) {
      resolve(data);
      document.removeChild(script);
    };
    params = { ...params, callback };
    const arrs = [];
    for (const key in params) {
      arrs.push(`${key}=${params[key]}`);
    }
    script.src = `${url}?${arrs.join('&')}`;
    document.body.appendChild(script);
  });
}

export function filterArr(arr) {
  if (!Array.isArray(arr) || !arr.length) {
    return arr;
  }
  const strArr = arr.map(item =>
    Object.prototype.toString.call(item) === '[object Object]' ||
    Array.isArray(item)
      ? JSON.stringify(item)
      : item
  );
  return strArr
    .filter((item, idx) => strArr.indexOf(item) === idx)
    .map(item => {
      try {
        return JSON.parse(item);
      } catch (err) {
        return item;
      }
    });
}
