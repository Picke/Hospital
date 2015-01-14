package com.bodeychuk.users.service;

import com.bodeychuk.users.dao.UserDao;
import com.bodeychuk.users.model.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class HospitalUserDeatailsService implements UserDetailsService {
    private UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(final String username)
            throws UsernameNotFoundException {

        com.bodeychuk.users.model.User user = userDao.findByUserName(username);
        List<GrantedAuthority> authorities = buildUserAuthority(user.getUserRole());

        return buildUserForAuthentication(user, authorities);


    }

    private org.springframework.security.core.userdetails.User buildUserForAuthentication(com.bodeychuk.users.model.User user,
                                            List<GrantedAuthority> authorities) {
        return new User(user.getUsername(),
                user.getPassword(), true,
                true, true, true, authorities);
    }

    private List<GrantedAuthority> buildUserAuthority(Set<UserRole> userRoles) {

        Set<GrantedAuthority> setAuths = new HashSet<>();

        // Build user's authorities
        for (UserRole userRole : userRoles) {
            setAuths.add(new SimpleGrantedAuthority(userRole.getRole()));
        }

        List<GrantedAuthority> Result = new ArrayList<>(setAuths);

        return Result;
    }

    public UserDao getUserDao() {
        return userDao;
    }

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}
