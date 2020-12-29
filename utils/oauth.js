const crypto = require("crypto");
const { method } = require("lodash");
const URL = require("url").URL;
const { param } = require("../api/users");
// https://github.com/ciaranj/node-oauth/blob/master/lib/oauth.js
// https://oauth.net/core/1.0/

class OAuth {
    constructor(
        consumerKey,
        consumerSecret,
        version,
        authorizeCallback,
        signatureMethod,
        nonceSize,
        customHeaders
    ) {
        (this.consumerKey = consumerKey),
            (this.consumerSecret = consumerSecret),
            (this.version = version),
            (this.authorizeCallback = authorizeCallback),
            (this.signatureMethod = signatureMethod || "HMAC-SHA1"),
            (this.nonceSize = nonceSize || 32),
            (this.customHeaders = customHeaders);
    }
    /* ~ Collect Params ~ */
    createNonce(nonceSize) {
        // Nonce is a random string unique to every request
        const nonceChars = [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
        ];
        let nonceCharsOptionsLength = nonceChars.length;
        let nonce = [];
        for (let i = 0; i < nonceSize; i++) {
            let charIndex = Math.floor(Math.random() * nonceCharsOptionsLength);
            nonce[i] = nonceChars[charIndex];
        }
        return nonce.join("");
    }

    createTimeStamp() {
        // The Timestamp to any request cannot be before the previous request made
        return Math.floor(new Date().getTime() / 1000);
    }

    encodeParameter(parameter) {
        // all elements when creating signature must be encoded
        if (parameter == null || parameter == "") {
            return "";
        } else {
            const encodedParameter = encodeURIComponent(parameter);
            // Fix the mismatch between oauth  RFC3986's and Javascript beliefs in what is right and wrong
            return encodedParameter
                .replace(/\!/g, "%21")
                .replace(/\'/g, "%27")
                .replace(/\(/g, "%28")
                .replace(/\)/g, "%29")
                .replace(/\*/g, "%2A");
        }
    }

    normalizeBaseStringUrl(url) {
        const urlObj = new URL(url);
        return urlObj.origin; // TODO: Test id this is the correct implementation
    }


    normalizeRequestParameters(parameters) {
        // Response = "a=1&c=hi%20there&f=25&f=50&f=a&z=p&z=t"
        // parameters are collected
        // parameters are sorted
        // concatenated int oa normalized string
        // parameters to include:
            // Oauth HTTP Authorization Headers excluding 'realm'
            // in HTTP POST request body with a 'content-type' of 'application/x-www-form-urlencoded'
            // in HTTP GET parameters added to the urls in the query part

        // parameters are sorted:
            // lexicographical byte value ordering unless two or more params share the same name
            
        // params are concatenated 
            // name is separated from value by '=' even if empty value
            // each pair is separated by a '&'

    }

    createBaseString(httpMethod, url, parameter) {
        // https://oauth.net/core/1.0/#sig_base_example
        // consistent and reproducible concatenation of request elements
        const encodedUrl = this.encodeParameter(
            this.normalizeBaseStringUrl(url)
        );
        const encodedParameter = this.encodeParameter(
            this.normalizeRequestParameters(parameter)
        );
        return (
            httpMethod.toUpperCase() + "&" + encodedUrl + "&" + encodedParameter
        );
    }

    createSignature(
        includeEntities,
        consumerKey,
        nonce,
        oauthMethod,
        timeStamp,
        oauthToken,
        oauthVersion
    ) {
        // TODO: Finish creating signature
        // TODO: Fifure out where the parameter ordering needs to be done
        //
        // oauthToken aka accessToken
    }
    /* ~ Request Tokens ~ */
    requestToken(
        resourceUrl,
        nonce,
        oauthCallback,
        signatureMethod,
        timeStamp,
        consumerKey,
        oauthSignature,
        oauthVersion
    ) {
        // responds with Access Tokens
    }
    /* ~ Authorize ~ */
}
