package com.pioneer.medgo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/customer")
public class AppController {
  @GetMapping("/")
  public String main() {
    return "customer-app";
  }
}
