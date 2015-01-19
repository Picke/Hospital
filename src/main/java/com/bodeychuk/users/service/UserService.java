package com.bodeychuk.users.service;

import com.bodeychuk.users.dao.UserDto;

public interface UserService {
    public String getCurrentUserRoles() throws Exception;
    public void saveUser(UserDto userDto);
    public String getAllUsers();
}
