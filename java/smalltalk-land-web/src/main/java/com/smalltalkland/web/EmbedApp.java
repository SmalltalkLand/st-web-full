package com.smalltalkland.web;

import java.applet.*;

import javax.swing.*;

import netscape.javascript.JSObject;


import java.awt.BorderLayout;

import java.awt.event.*;

import ru.atomation.jbrowser.impl.JBrowserComponent;
import ru.atomation.jbrowser.impl.JBrowserBuilder;
import ru.atomation.jbrowser.impl.JBrowserCanvas;
import ru.atomation.jbrowser.impl.JComponentFactory;
import ru.atomation.jbrowser.interfaces.BrowserManager;

import org.mozilla.browser.MozillaAutomation;
import org.mozilla.browser.MozillaExecutor;
public class EmbedApp extends Applet
{
    static final long serialVersionUID = 20000000;
    private JFrame contentFrame;
    public JSObject getJS(String id){try{return JSObject.getWindow(this).getMember("st-java-link-" + id);}catch(Exception err){return null;};};
    EmbedApp(){
contentFrame = new JFrame();
add(contentFrame);
JPanel p = new JPanel();
contentFrame.setLayout(new BorderLayout());
contentFrame.add(p,BorderLayout.LINE_START);
p.setLayout(new BorderLayout());
JButton button=new JButton("Start Server");
p.add(button,BorderLayout.PAGE_START);
final EmbedApp self = this;
button.addActionListener(new ActionListener(){
public void actionPerformed(ActionEvent evt){
self.startServer();

};

});
JButton b2 = new JButton("Start Browser");
p.add(b2,BorderLayout.PAGE_START);
b2.addActionListener(new ActionListener(){
public void actionPerformed(ActionEvent evt){self.newBrowser();}

});
    }
     public void newBrowser(){
		BrowserManager browserManager = new JBrowserBuilder()
				.buildBrowserManager();

		final JBrowserComponent<JFrame> browser = (JBrowserComponent<JFrame>) browserManager
                .getComponentFactory(JBrowserFrame.class).createBrowser();
        contentFrame.add(browser.getComponent());

    }
    private void startServer(){
WebApp.main(new String[]{});

    }
    public void thread(JSObject objectWithRun){
        JSThread t = new JSThread();
        t.func = objectWithRun;
        Thread nt = new Thread(t);
        nt.start();

    }

}
