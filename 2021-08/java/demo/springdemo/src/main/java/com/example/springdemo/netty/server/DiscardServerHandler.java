package com.example.springdemo.netty.server;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

/**
 * Handles a server-side channel.
 */
public class DiscardServerHandler extends SimpleChannelInboundHandler<Object> {

    @Override
    public void channelRead0(ChannelHandlerContext ctx, Object msg) throws Exception {
        ByteBuf byteBuf = (ByteBuf) msg;
        byte[] result = new byte[byteBuf.readableBytes()];
        byteBuf.readBytes(result);
        String text = new String(result);
        System.out.println("log: 收到客户端消息:" + text);
    }

    @Override
    public void channelActive(final ChannelHandlerContext ctx) { // (1)
        final ByteBuf byteBuf = ctx.alloc().buffer(8);
        System.out.println("log: 有新连接");
        byteBuf.writeBytes("server send: 你好，欢迎建立长连接".getBytes());
        ctx.writeAndFlush(byteBuf, ctx.channel().newPromise());
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        // Close the connection when an exception is raised.
        cause.printStackTrace();
        ctx.close();
    }
}