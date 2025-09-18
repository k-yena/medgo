package com.pioneer.medgo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/customer")
public class AppController {
  @GetMapping("/")
  public String main() {
    System.out.println("서버가 켜진건 맞는디");
    return "landing";
  }
}
