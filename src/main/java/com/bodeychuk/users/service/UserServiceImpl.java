package com.bodeychuk.users.service;

import com.bodeychuk.users.dao.UserDao;
import com.bodeychuk.users.dao.UserDto;
import com.bodeychuk.users.model.User;
import com.bodeychuk.users.model.UserRole;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public String getCurrentUserRoles(){
        ObjectMapper mapper = new ObjectMapper();

        org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Collection<GrantedAuthority> authorities = user.getAuthorities();

        String roles = "";
        try {
            roles = mapper.writeValueAsString(authorities);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return roles;
    }

    @Override
    public void saveUser(UserDto userDto) {
        com.bodeychuk.users.model.User user = new com.bodeychuk.users.model.User(userDto.getUsername(), userDto.getPassword(), true, new HashSet<UserRole>());
        userDao.saveUser(user);
        userDao.saveUserRoles(user, userDto.getRoles());
    }

    @Override
    public String getAllUsers() {
        ObjectMapper mapper = new ObjectMapper();
        Set<UserDto> userDtos = new HashSet<>();
        Set<String> roles;
        String json = "";

        List<User> users = userDao.getAllUsers();

        for (User user : users) {
            roles = new HashSet<>();
            for (UserRole role : user.getUserRole()) {
                roles.add(role.getRole());
            }
            userDtos.add(new UserDto(user.getUsername(), "", roles));
        }
        try {
            json = mapper.writeValueAsString(userDtos);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return json;
    }
}
