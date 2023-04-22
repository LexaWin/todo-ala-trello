export class LSRequest {
    setItem(...args) {
        return this.__makeRequest(localStorage.setItem, ...args);
    }

    getItem(...args) {
        return this.__makeRequest(localStorage.getItem, ...args);
    }

    getItemById(key, id) {
        return new Promise(resolve => {
            setTimeout(() => {
                const response = JSON.parse(localStorage.getItem(key)).filter((ticket)=>ticket.id === id);
                resolve(response[0]);
            }, 500);
        });
    }

    removeItem(...args) {
        return this.__makeRequest(localStorage.removeItem, ...args);
    }

    __makeRequest(handler, ...args) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (args.length > 0)
                    args[1] = JSON.stringify(args[1]);
                let response = handler.call(localStorage, ...args);
                if (response === null)
                    response = [];
                if (typeof response === 'string')
                    response = JSON.parse(response);
                if (!Array.isArray(response))
                    response = [response];
                resolve(response);
            }, 500);
        });
    }

}