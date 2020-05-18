package com.smalltalkland.web;
import java.applet.*;
import netscape.javascript.JSObject;
class JSThread implements Runnable{
public JSObject func;
public void run(){
func.call("call",new Object[]{});

}
}