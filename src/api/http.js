import axios from "axios";

const HTTP = axios.create({
    baseURL: 'http://194.54.64.227:8000/api/v1/', //вынест в env
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    timeout: 10000,
  })

export {HTTP};