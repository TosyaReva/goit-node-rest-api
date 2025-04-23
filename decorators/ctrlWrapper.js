const ctrlWrapper = (ctrl) => {
    const func = async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            if (error.message === "Contact not found") error.status = 404;
            next(error);
        }
    };
    return func;
};
export default ctrlWrapper;
