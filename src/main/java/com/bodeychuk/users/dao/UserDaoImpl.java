package com.bodeychuk.users.dao;

import com.bodeychuk.users.model.User;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Transactional
public class UserDaoImpl implements UserDao{

    private final String SAVE_USER_ROLES = "INSERT INTO user_roles (UserId, RoleId) VALUES (" +
            "(SELECT Id FROM users WHERE Username = ?), " +
            "(SELECT Id FROM roles WHERE Role = ?)) ";
    @Autowired
    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public User findByUserName(String username) {
        List<User> users = sessionFactory.getCurrentSession()
                .createQuery("from User where username=?")
                .setParameter(0, username).list();

        if (users.size() > 0) {
            return users.get(0);
        } else {
            return null;
        }
    }

    @Override
    public void saveUser(User user) {
        sessionFactory.getCurrentSession().save(user);
    }

    @Override
    public void saveUserRoles(User user, Set<String> userRoles) {
        for (String role : userRoles) {
            sessionFactory.getCurrentSession().createSQLQuery(SAVE_USER_ROLES)
                    .setParameter(0, user.getUsername())
                    .setParameter(1, role).executeUpdate();
        }
    }

    @Override
    public List<User> getAllUsers() {
        return sessionFactory.getCurrentSession().createQuery("from User").list();
    }

    @Override
    public void deleteUser(User user) {
        sessionFactory.getCurrentSession().delete(user);
    }

}
