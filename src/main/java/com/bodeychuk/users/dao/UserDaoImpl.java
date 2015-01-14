package com.bodeychuk.users.dao;

import com.bodeychuk.users.model.User;
import org.hibernate.SessionFactory;

import java.util.ArrayList;
import java.util.List;

public class UserDaoImpl implements UserDao{

    private SessionFactory sessionFactory;

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public User findByUserName(String username) {
        List<User> users = new ArrayList<User>();

        users = getSessionFactory().getCurrentSession()
                .createQuery("from User where username=?")
                .setParameter(0, username).list();

        if (users.size() > 0) {
            return users.get(0);
        } else {
            return null;
        }
    }
}
