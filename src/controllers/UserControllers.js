const User = require("../models/User");

class UserControllers {
    /**
     * "Get all users from the database, but don't return their password, isAdmin, or dateRegistered
     * fields."
     *
     * The first parameter of the `find()` function is an empty object, which means that we want to get all
     * users. The second parameter is an object that specifies which fields we want to exclude from the
     * results.
     *
     * The `then()` function is a promise, which means that the function will return a promise that will be
     * resolved when the database query is complete.
     */
    getUsers() {
        return User.find({}, { password: 0, isAdmin: 0, dateRegistered: 0 }).then((result) => {
            return result;
        });
    }

    register(body) {
        const newUser = new User(body);
        return newUser.save().then((result) => {
            return result ? { status: "Registered", email: result.email } : { error: "Something went wrong" };
        });
    }

    /**
     * It takes an id, finds the user with that id, and deletes it.
     */
    delete(id) {
        return User.findByIdAndDelete(id).then((result) => {
            return result ? { status: "Deleted", id: result._id } : { status: "Invalid request" };
        });
    }

    /**
     * It takes an id and a body, finds the user by id, and updates the user with the body.
     */
    update(id, body) {
        return User.findByIdAndUpdate(id, body, { returnDocument: "after" }).then((result) => {
            return result ? result : { error: "Something went wrong" };
        });
    }
}
module.exports = new UserControllers();
