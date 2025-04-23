import HttpError from "./HttpError.js";

const uploadErrorHanler = (err, req, res, next) => {
    if (err) {
        next(HttpError(400, err.message));
    } else {
        next();
    }
};
export default uploadErrorHanler;
