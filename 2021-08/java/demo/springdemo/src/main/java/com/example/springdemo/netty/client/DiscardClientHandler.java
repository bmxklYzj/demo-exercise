package com.example.springdemo.netty.client;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

public class DiscardClientHandler extends SimpleChannelInboundHandler {
    @Override
    public void channelRead0(ChannelHandlerContext ctx, Object msg) {
        ByteBuf byteBuf = (ByteBuf) msg;
        byte[] result = new byte[byteBuf.readableBytes()];
        byteBuf.readBytes(result);
        String text = new String(result);
        System.out.println("log: 收到服务端消息:" + text);

        final ByteBuf time = ctx.alloc().buffer(8);
        time.writeBytes("client send 建立长连接".getBytes());
        ctx.writeAndFlush(time, ctx.channel().newPromise());
    }


    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        // Close the connection when an exception is raised.
        cause.printStackTrace();
        ctx.close();
    }

}