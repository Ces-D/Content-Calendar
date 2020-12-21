const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { generateToken } = require("../platforms/users");
const { keys } = require("lodash");

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
                // console.log("user Found");
                const isValidated = await bcrypt.compare(
                    password,
                    user.password
                );
                if (isValidated) {
                    // console.log("Password Validated");
                    const modifier = {};

                    let jsonToken = await generateToken(
                        user._id,
                        user.displayName
                    );

                    modifier.jsonToken = jsonToken;

                    await this.updateOne({ _id: user._id }, { $set: modifier });
                    return jsonToken;
                }
                throw "Email Or Password Do Not Match";
            }
            throw "Email Not Registered";
        } catch (error) {
            // console.log("Model Error", error);
            // TODO: Condition error response if error contains sensitive info
            throw new Error(error);
        }
    }

    static async register({ email, password, displayName }) {
        try {
            const user = await this.findOne({ email });
            if (user) {
                throw "User Already Registered";
            }
            const hashPassword = await bcrypt.hashSync(password, 10);
            const newUser = await this.create({
                email: email,
                password: hashPassword,
                displayName: displayName,
            });

            // console.log("User Registered");
            return newUser;
        } catch (error) {
            // console.log("Model Error", error);
            // TODO: Condition error response if error contains sensitive info
            throw new Error(error);
        }
    }

    static async update({ id, updatedFields }) {
        try {
            const user = await this.findOne({ _id: id });

            if (user) {
                const modifier = {};
                // logic for updating and returning a new JWT

                for (const key in updatedFields) {
                    if (key == "password") {
                        const value = bcrypt.hashSync(updatedFields[key], 10);
                        modifier.password = value;
                    }
                    modifier.password = updatedFields[key];
                }
                // console.log(modifier);
                // TODO: return updated user not previous user
                await this.updateOne({ _id: id }, { $set: modifier });

                const updatedUser = await this.findOne({ _id: id });
                return updatedUser;
            } else {
                throw "User Not Found";
            }
        } catch (error) {
            throw new Error(error);
        }
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

const User = mongoose.model("User", mongoSchema);

module.exports = User;
