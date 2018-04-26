import md5 from "md5";

let Driver = {
    handlers: {
        /**
         * Handles ping event
         */
        pingHandler: function() {
            return new Promise(resolve => {
                resolve(Driver._util.buildPayload(0));
            });
        },
        /**
         * Handles nickname successfully set code from server
         */
        nicknameAcceptedHandler: function () {
            console.log("Nickname accepted");
            return new Promise(resolve => {
                resolve(null);
            });
        },
        /**
         * Handles nickname unsuccessfully set from game server
         */
        nicknameRejectedHandler: function () {
            console.log("Nickname rejected");
            return new Promise(resolve => {
                resolve(null);
            });
        },

        quizAcceptedHandler: function () {
            console.log("Quiz accepted");
            return new Promise(resolve => {
                resolve(null);
            });
        },

        quizRejectedHandler: function () {
            return new Promise(resolve => {
                resolve(null);
            });
        },

        answersAcceptedHandler: function () {
            console.log("Answers accepted");
            return new Promise(resolve => {
                resolve(null);
            });
        },

        answersRejectedHandler: function () {
            console.log("Answers rejected");
            return new Promise(resolve => {
                resolve(null);
            });
        }
    },

    emitters: {
        /**
         * Sends set nickname event
         * @param payload - The desired nickname for the current user
         */
        nicknameEmitter: function (payload) {
            return new Promise(resolve => resolve(Driver._util.buildPayload(1, payload)));
        },

        /**
         * Sends verify has event
         * @param payload - A string representation of the quiz
         */
        quizHashEmitter: function (payload) {
            let hash = md5(payload);
            return new Promise(resolve => resolve(Driver._util.buildPayload(4, hash)));
        },

        answersEmitter: function (payload) {
            let fullPayload = Driver._util.concatTypedArrays(new Uint8Array([7]), new Uint8Array(payload));
            console.log(fullPayload);
            return new Promise(resolve => resolve(fullPayload.buffer));
        }
    },

    // internal utilities
    _util: {
        /**
         * Build payload to be sent by WebSocket
         * @param opcode
         * @param payload
         * @returns {*}
         */
        buildPayload: function(opcode, payload = ""){
            let operation = new Uint8Array([opcode]);
            let newPayload = new Uint8Array(this.stringToArrayBuffer(payload));
            return this.concatTypedArrays(operation, newPayload).buffer;
        },

        /**
         * Convert a string to ArrayBuffer using our custom SINU encoder
         * https://wolfbeacon.atlassian.net/wiki/spaces/WG/pages/409534465/HowlPlay+WebSocket+Sub-Protocol+Specification
         * @param str
         * @returns {ArrayBuffer}
         */
        stringToArrayBuffer: function(str){
            let buf = new ArrayBuffer(str.length);
            let bufView = new Uint8Array(buf);
            for (let i = 0, strLen = str.length; i < strLen; i++) {
                bufView[i] = str.charCodeAt(i);
            }
            return buf;
        },

        /**
         * Convert an ArrayBuffer back to string
         * @param buf
         * @returns {string}
         */
        arrayBufferToString: function(buf){
            return String.fromCharCode.apply(null, new Uint8Array(buf));
        },

        /**
         * Concat two typed arrays, and returns array in type of 'a'
         * @param a
         * @param b
         * @returns {*}
         */
        concatTypedArrays: function(a, b) { // a, b TypedArray of same type
            let c = new (a.constructor)(a.length + b.length);
            c.set(a, 0);
            c.set(b, a.length);
            return c;
        },
    }
};

export default Driver;
