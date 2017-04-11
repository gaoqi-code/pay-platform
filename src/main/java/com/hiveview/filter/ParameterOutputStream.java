//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.hiveview.filter;

import javax.servlet.ServletOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class ParameterOutputStream extends ServletOutputStream {
    private ByteArrayOutputStream bos = null;

    public ParameterOutputStream(ByteArrayOutputStream outputStream) {
        this.bos = outputStream;
    }

    public void write(int b) throws IOException {
        this.bos.write(b);
    }

    public void write(byte[] b, int off, int len) throws IOException {
        this.bos.write(b, off, len);
    }

    public void write(byte[] b) throws IOException {
        this.bos.write(b);
    }
}
