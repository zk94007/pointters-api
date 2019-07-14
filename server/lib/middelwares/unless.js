const pathToRegexp = require('path-to-regexp');
const url = require('url');
module.exports = (middelware) => (unlessPaths) => {
    const middelwaresWithUnlessOptions = unlessPaths
            .map((element) => {
                if (typeof element === 'string') return {path:element};
                element.path = pathToRegexp(element.path || './');
                return element;
            });
    return async (ctx, next) => {
        for (let i = 0; i < middelwaresWithUnlessOptions.length; i++) {
            const pathOptions = middelwaresWithUnlessOptions[i];
            const re = pathToRegexp(pathOptions.path || './');
            const {pathname} = url.parse(ctx.url);
            let unProtected = re.exec(pathname);
            if (pathOptions.method) unProtected = unProtected && ctx.method === pathOptions.method;
            if (unProtected) return await next();
        }
        await middelware(ctx, next);
    };
};
