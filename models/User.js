const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            unique: true,
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
    static async login({ email, password }) {
        try {
            const user = await this.findOne({ email });
            if (user) {
                const isValidated = await bcrypt.compare(
                    password,
                    user.password
                );
                if (isValidated) {
                    // if user isValidated return user with jsonToken
                    const modifier = {};

                    let jsonToken = jwt.sign(
                        {
                            _id: user._id,
                            displayName: user.displayName,
                        },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: "10h" }
                    );

                    modifier.jsonToken = jsonToken;

                    await this.updateOne({ _id: user._id }, { $set: modifier });
                    return user;
                }
                throw new Error("Email Or Password Do Not Match");
            }
            throw new Error("Email Not Registered");
        } catch (error) {
            return error;
        }
    }

    static async register({ email, password, displayName }) {
        try {
            const user = await this.findOne({ email });
            if (user) {
                throw new Error("User Already Registered");
            }
            // save the user information and return a JWT and signing in
            const hashPassword = await bcrypt.hashSync(password, 10);
            const newUser = await this.create({
                email,
                hashPassword,
                displayName,
            });
            return newUser;
        } catch (error) {
            return error;
        }
    }

    static async update({ id, newEmail, newPassword, newDisplayName }) {
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
