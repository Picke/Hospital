package com.bodeychuk.users.dao;

import java.util.HashSet;
import java.util.Set;

public class UserDto {
    private String username;
    private String password;
    private Set<String> userRole  = new HashSet<>(0);


    public UserDto(String username, String password, Set<String> userRole) {
        this.username = username;
        this.password = password;
        this.userRole = userRole;
    }

    public UserDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getUserRole() {
        return userRole;
    }

    public void setUserRole(Set<String> userRole) {
        this.userRole = userRole;
    }
}
