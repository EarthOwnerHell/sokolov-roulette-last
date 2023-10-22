const comment = require("./types/comment");
const event_message = require("./types/event_message");
const groupController = require("./types/groupController");
const like = require("./types/like")
const message = require("./types/message");
const repost = require("./types/repost");

const sendTo = {
    message: (ctx) => message(ctx),
    message_event: (ctx) => event_message(ctx),
    like: (ctx) => like(ctx),
    comment: (ctx) => comment(ctx),
    wall_post: (ctx) => repost(ctx), 
    group_member: (ctx) => groupController(ctx)
};

module.exports = (ctx) => {
    if (!sendTo[ctx.type]) return;

    return sendTo[ctx.type](ctx)
}
