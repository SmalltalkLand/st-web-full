package com.smalltalkland.web;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import java.util.HashMap;
@Controller


public class MainController {
    private Object applet;
    public Object getBaseApplet(){return applet;};
    public void setBaseApplet(Object a){applet = a;};
    public EmbedApp getMyApplet(){return (EmbedApp)getBaseApplet();};
    public void setMyApplet(EmbedApp a){setBaseApplet((Object)a);};
    @RequestMapping(value = "/")
    public ModelAndView getIndex() {
        HashMap<String,Object>  params = new HashMap<String, Object>();

        return new ModelAndView("index", params);
    }
    @RequestMapping(value = "/server/{port}")
    public String getServerReq(@PathVariable("port") String port,ServerParams params){

return "Error";
    }
}