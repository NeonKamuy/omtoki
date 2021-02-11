import { AxiosResponse } from "axios";

export default class Requests {
    public static handleResponse(args: {response: AxiosResponse<any>, cb?: (data: any) => void}) {
        const {response, cb} = args;
        const {data} = response;
        
        if(response.status !== 200 && response.status !== 201) {
            throw new Error(data);
        } else {
            cb && data && cb(data);
        }
    }
}