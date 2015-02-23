package com.bodeychuk.administration.dao;

import com.bodeychuk.administration.model.User;

import java.util.List;
import java.util.Set;

public interface UserDao {
    User findByUserName(String username);
    void saveUser(User user);
    void saveUserRoles(User user, Set<String> userRoles);
    List<User> getAllUsers();
    void deleteUser(User user);
}
