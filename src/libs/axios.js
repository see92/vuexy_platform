import axios from "axios";
import Vue from "vue";
import Cookies from "js-cookie";

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {},
    };
    return config;
  }
  destroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
    }
  }
  interceptors(instance, url) {
    instance.interceptors.request.use(
      (config) => {
        Cookies.get("vuexy_token") &&
          (config.headers.Authorization =
            "Bearer " + Cookies.get("vuexy_token"));
        this.queue[url] = true;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (res) => {
        switch (res.status) {
          case 200:
            break;
          default:
            Vue.swal.fire({
              icon: "error",
              text: error.response.data.message,
            });
            break;
        }
        this.destroy(url);
        const { data, status } = res;
        return { data, status };
      },
      (error) => {
        Vue.swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
        this.destroy(url);
        return Promise.reject(error.response);
      }
    );
  }
  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
