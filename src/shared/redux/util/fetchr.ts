const Fetchr = require('fetchr');
import ClientConst from '../../../ClientConst';

type FetcherFactory = {
    instance: any,
    getFetchr: () => any
};

declare var window : { _csrf: string };

let csrf = "";
if (typeof window !== "undefined") {
  csrf = window && window._csrf || "no token";
}

const fetchrFactory :FetcherFactory = {
    instance: null,
    getFetchr: function() {
        if (!this.instance) {
            this.instance = new Fetchr({
                xhrPath: ClientConst.apiBasePath,
                xhrTimeout: 10000,
                context: {
                  _csrf: csrf
                }
            })
        }

        return this.instance && this.instance;
    }
}

const fetchr = fetchrFactory.getFetchr();

export default fetchr;
