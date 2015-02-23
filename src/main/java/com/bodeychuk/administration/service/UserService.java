package com.bodeychuk.administration.service;

import com.bodeychuk.administration.dao.UserDto;

public interface UserService {
    public String getCurrentUserRoles() throws Exception;
    public void saveUser(UserDto userDto);
    public String getAllUsers();
    public void deleteUser(String username);
    public boolean exists(String username);
}
