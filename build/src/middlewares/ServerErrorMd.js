"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useServerErrorMd = void 0;
function useServerErrorMd(err, req, res, next) {
    if (err) {
        return res.render('pages.500', { message: err.message });
    }
    return next();
}
exports.useServerErrorMd = useServerErrorMd;
