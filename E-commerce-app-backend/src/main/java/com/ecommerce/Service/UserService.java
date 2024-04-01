package com.ecommerce.Service;

import com.ecommerce.Exceptions.UserException;
import com.ecommerce.Models.User;

public interface UserService {
	
	public User findUserById(Long userId) throws UserException;
	
	public User findUserProfileByJwt(String jwt) throws UserException;

}
