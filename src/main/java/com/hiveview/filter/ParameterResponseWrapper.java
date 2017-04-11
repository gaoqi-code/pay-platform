//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.hiveview.filter;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.ByteArrayOutputStream;
import java.io.CharArrayWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class ParameterResponseWrapper extends HttpServletResponseWrapper {
    private PrintWriter cachedWriter;
    private CharArrayWriter bufferedWriter = new CharArrayWriter();
    private ByteArrayOutputStream bos = new ByteArrayOutputStream();
    private ParameterOutputStream parameterOutputStream = null;

    public ParameterResponseWrapper(HttpServletResponse response) throws IOException {
        super(response);
        this.cachedWriter = new PrintWriter(this.bufferedWriter);
        this.parameterOutputStream = new ParameterOutputStream(this.bos);
    }

    public PrintWriter getWriter() {
        return this.cachedWriter;
    }

    public ServletOutputStream getOutputStream() throws IOException {
        return this.parameterOutputStream;
    }

    public String getResult() {
        return this.bufferedWriter.toString();
    }

    public byte[] getResultDate() {
        return this.bos.toByteArray();
    }
}
