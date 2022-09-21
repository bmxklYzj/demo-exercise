//package com.yzj._07_Thread;
//
//public class ThreadDemo {
//  public static void main(String[] args) throws InterruptedException {
//    System.out.println("main start");
//    long startTime = System.currentTimeMillis();
//    Thread t = new Thread(() -> {
//      try {
//        Thread.sleep(20);
//      } catch (InterruptedException e) {
//        e.printStackTrace();
//      }
//      System.out.println("Thread start: " + (System.currentTimeMillis() - startTime));
//    });
//    t.start();
//    t.join();
//    System.out.println("main end: " + (System.currentTimeMillis() - startTime));
//  }
//}
//
//class MyThread1 implements Runnable {
//  @Override
//  public void run() {
//    System.out.println("run start");
//  }
//}
//class MyThread extends Thread {
//  @Override
//  public void run() {
//    System.out.println("run start");
//  }
//}