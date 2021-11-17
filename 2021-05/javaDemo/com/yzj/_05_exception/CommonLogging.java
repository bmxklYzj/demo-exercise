//package com.yzj._05_exception;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class CommonLogging {
    public static void main(String[] args) {
        Log log = LogFactory.getLog(CommonLogging.class);
        log.info("start...");
        log.warn("end.");
    }
}
