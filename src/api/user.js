import axios from "@/libs/api.request";

export const getSmsCode = ({ phone }) => {
  const data = { phone };
  return axios.request({
    url: 'api/account/get_sms_code',
    params: data,
    method: 'get',
  });
};

/**
 * 
 * @param {string} phone 
 * @param {string} code 
 * @returns 
 */
export const getToken = (data) => {
  return axios.request({
    url: 'api/account/get_token',
    params: data,
    method: 'get'
  });
};
