"use strict";

import Vue from 'vue';
import axios from "axios";
import store from '../store/index'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
	baseURL: "http://47.115.51.185/api"
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);
//请求的前置操作
_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
	// console.log(document.cookie);
	//判断是否有登录token有 在每次请求的额时候都带上token
	if(store.state.token){
	  config.headers={
	    'Authori-zation':'Bearer '+store.state.token,
	  }
	}else{
	  let cookies=document.cookie.split('=');
	  config.headers={
	    'Authori-zation':'Bearer '+cookies[1]
	  }
	}
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
