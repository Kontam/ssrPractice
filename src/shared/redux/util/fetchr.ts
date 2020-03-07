const Fetchr = require('fetchr');
import ClientConst from '../../../ClientConst';

type FetcherFactory = {
    instance: any,
    getFetchr: () => any
};

const fetchrFactory :FetcherFactory = {
    instance: null,
    getFetchr: function() {
        if (!this.instance) {
            this.instance = new Fetchr({
                xhrPath: ClientConst.apiBasePath,
            })
        }

        return this.instance && this.instance;
    }
}

const fetchr = fetchrFactory.getFetchr();

export default fetchr;