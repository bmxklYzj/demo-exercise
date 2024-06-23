package com.example.springdemo.netty.client;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

public class DiscardClientHandler extends SimpleChannelInboundHandler<String> {
    @Override
    public void channelRead0(ChannelHandlerContext ctx, String msg) {
        System.out.println("log: 收到服务端消息:" + msg);

        final ByteBuf buf = ctx.alloc().buffer(8);
        buf.writeBytes("client send 建立长连接".getBytes());
        ctx.writeAndFlush(buf, ctx.channel().newPromise());
    }


    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        // Close the connection when an exception is raised.
        cause.printStackTrace();
        ctx.close();
    }

}