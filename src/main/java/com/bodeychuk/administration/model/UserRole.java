package com.bodeychuk.administration.model;

public class UserRole {
    private int id;
    private String role;


    public UserRole() {
    }

    public UserRole(String role) {
        this.role = role;
    }

    public UserRole(int id, String role, User user) {
        this.id = id;
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
