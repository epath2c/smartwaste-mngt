package ca.sheridancollege.smartwaste.controllers.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
//	@GetMapping("/")
//	public String goHome() {
//		return "index.html";
//	}
//
//	@GetMapping("/view")
//	public String goView() {
//		return "index.html";
//	}
//	@GetMapping("/login")
//	public String goToLogin() {
//		return "index.html";
//	}
//	@GetMapping("/register")
//	public String goToRegister() {
//		return "index.html";
//	}
	@RequestMapping(value = { "/", "/login", "/register", "/view" })
    public String forward() {
        return "forward:/index.html";
    }
}
