const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const allowedFields = { password: 0, isAdmin: 0, dateRegistered: 0, __v: 0 };

class UserControllers {
    /**
     * "Get all users from the database, and return only the allowed fields."
     * The `allowedFields` variable is an array of strings that contains the fields we want to return.
     * returns An array of users.
     */
    static async getUsers() {
        return await User.find({}, allowedFields);
    }

    /**
     * It takes an id, finds a user by that id, and returns the user if it exists, otherwise it returns an
     * object with an access property of false and a message property of "ID: , does not exist"
     */
    static async getUserById(id) {
        const result = await User.findById(id, allowedFields);

        return result ? result : { access: false, message: `ID: ${id}, does not exist` };
    }

    /**
     * It checks if the email is already registered, if not, it creates a new user with the given email
     * and password, and returns the result.
     * returns The result of the function is an object with two properties: access and email.
     */
    static async register(body) {
        const checkEmail = await User.findOne({ email: body.email });

        if (!checkEmail) {
            body.isAdmin = false;
            body.password = await bcrypt.hash(body.password, saltRounds);
            const newUser = new User(body);
            const result = await newUser.save();

            return result
                ? { access: true, email: result.email }
                : { message: "Something went wrong", access: "Error on request" };
        }

        return { access: false, message: "Could not register email: " + body.email };
    }

    /**
     * It takes an id, finds the user with that id, and deletes it.
     */
    static async delete(id) {
        const result = await User.findByIdAndDelete(id);

        return result
            ? { access: true, message: "Deleted", id: result._id }
            : { access: false, message: "Could not delete ID: " + id };
    }

    /**
     * It takes an id and a body, finds the user by id, and updates the user with the body.
     */
    static async update(id, body) {
        if (body.password) return { access: false, message: "Could not update ID: " + id };

        const result = await User.findByIdAndUpdate(id, body, { returnDocument: "after" });

        return result ? { access: true, updated: body } : { access: false, message: "Could not update ID: " + id };
    }

    /**
     * It checks if the email and password entered by the user matches the email and password in the
     * database. If it does, it returns a message saying "You're now logged in". If it doesn't, it
     * returns a message saying "Invalid Email or Password".
     */
    static async login(body) {
        const result = await User.findOne({ email: body.email });

        if (result && (await bcrypt.compare(body.password, result.password))) {
            return { access: true, message: "You're now logged in" };
        }

        return { access: false, message: "Invalid Email or Password" };
    }
}
module.exports = UserControllers;
