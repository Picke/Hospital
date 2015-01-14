package com.bodeychuk.users.service;

import com.bodeychuk.users.dao.UserDao;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public String getCurrentUserRoles() throws Exception{
        ObjectMapper mapper = new ObjectMapper();

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Collection<GrantedAuthority> authorities = user.getAuthorities();

        String roles = "";
        try {
            roles = mapper.writeValueAsString(authorities);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return roles;
    }
}
