import Ajax from '../utils/ajax';

export default class RestService {

    static requestData(method, url, data, contentType, headers) {
        return new Promise(function(resolve, reject) {
            Ajax.send({
                type: method,
                url:  ((window.config && window.config.restUrl) || '') + url,
                data: data,
                prefix: '[APP]',
                contentType: contentType || 'json',
                success: resolve,
                error: reject,
                headers: headers
            });
        });
    }

    /**
     *
     * @param url - URL
     * @param params - query params
     * @returns promise
     */
    static get(url, params, contentType) {
        return this.requestData('GET', url, params ? params : null, contentType);
    }

    /**
     *
     * @param url - URL
     * @param data - POST data
     * @returns promise
     */
    static post(url, data, contentType) {
        return this.requestData('POST', url, data, contentType).then(function(res){
            if(res && typeof res === 'string'){
              res = JSON.parse(res);
            }

            return res;
          },
          function(err){
            if(err && err.message && typeof err.message === 'string'){
              err.message = JSON.parse(err.message);
              err.error = err.message.error;
              err.message = err.message.message;
            }

            throw(err);
          }
        );
    }

    /**
     *
     * @param url - URL
     * @param data - POST data
     * @returns promise
     */
    static put(url, data) {
        return this.requestData('PUT', url, data);
    }

    /**
     *
     * @param url - URL
     * @param data - POST data
     * @returns promise
     */
    static patch(url, data) {
        return this.requestData('PATCH', url, data);
    }

    /**
     *
     * @param url - URL
     * @param data - Data to Delete
     * @returns promise
     */
    static delete(url, data) {
        return this.requestData('DELETE', url, data);
    }
}