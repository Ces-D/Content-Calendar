const mongoose = require("mongoose");
const _ = require("lodash");

const mongoSchema = new mongoose.Schema(
    {
        displayName: {
            type: String,
            require: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        jsonToken: {
            type: String,
            required: true,
            unique: True,
        },
        isTwitterConnected: {
            type: Boolean,
            default: false,
        },
        twitterAccessToken: {
            type: String,
        },
    },
    { timestamps: true }
);

class UserClass {
    static async signInOrSignUp({ email, password, displayName }) {
        const user = await this.findOne({ email });

        if (user) {
            const modifier = {};
            // some logic for returning the jwt and signing in
        }
        // else Sign Up
    }

    static async updateAccount({ id, email, password, displayName }) {
        const user = await this.findOne({ id });

        if (user) {
            const modifier = {};
            // logic for updating and returning a new JWT
        }
        // else return error
    }

    static async connectOrDisconnectTwitter({
        id,
        twitterAccessToken,
        isTwitterConnected,
    }) {
        const user = await this.findOne({ id });
        if (user) {
            if (isTwitterConnected) {
                // logic for adding the twitter connection
            }
            // logic for removing the twitter connection
        }
    }
}

mongoSchema.loadClass(UserClass);

module.exports = mongoSchema;
