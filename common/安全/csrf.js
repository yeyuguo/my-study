const Koa = require('koa')
const Router = require('koa-router');
const app = new Koa();
const router = new Router();



router.get(
    '/csrf',
    (ctx, next) => {
        // ctx.body = "test csrf"
        ctx.body = ctx.request.query
    }
)

app.use(router.routes())


app.use(async (ctx, next) => {
    let url = ctx.url
    let url_path = ctx.path
    // 从上下文的request对象中获取
    let request = ctx.request
    let req_query = request.query
    let req_querystring = request.querystring

    // 从上下文中直接获取
    let ctx_query = ctx.query
    let ctx_querystring = ctx.querystring

    if (url_path == '/test') {
        ctx.body = {
            url,
            req_query,
            req_querystring,
            ctx_query,
            ctx_querystring
        }
    }
})

app.listen(3000, () => {
    console.log('[demo] request get is starting at port 3000')
})