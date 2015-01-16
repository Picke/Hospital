package com.bodeychuk.users.dao;

import com.bodeychuk.users.model.User;

public interface UserDao {
    User findByUserName(String username);
    void saveUser(User user);
}
