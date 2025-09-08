package com.pioneer.medgo.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString 
public class LoginDTO {
	private String email;
	private String password;

}
