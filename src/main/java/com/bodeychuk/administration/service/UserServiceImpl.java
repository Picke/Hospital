package com.bodeychuk.administration.service;

import com.bodeychuk.administration.dao.UserDao;
import com.bodeychuk.administration.dao.UserDto;
import com.bodeychuk.administration.model.User;
import com.bodeychuk.administration.model.UserRole;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
        User user = new User(userDto.getUsername(), userDto.getPassword(), true, new HashSet<UserRole>());
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

    @Override
    public void deleteUser(String username) {
        User user = userDao.findByUserName(username);
        userDao.deleteUser(user);
    }

    @Override
    public boolean exists(String username) {
        return userDao.findByUserName(username) != null;

    }
}
