package com.ecommerce.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.Exceptions.UserException;
import com.ecommerce.Models.User;
import com.ecommerce.Repository.UserRepository;
import com.ecommerce.config.JwtProvider;

@Service
public class UserServiceImplementation implements UserService {
	
	@Autowired(required = true)
	private UserRepository userRepository;
	
	@Autowired
	private JwtProvider jwtProvider;

	@Override
	public User findUserById(Long userId) throws UserException {
		
		Optional<User> opt = userRepository.findById(userId);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		
		throw new UserException("User not found with id - " + userId);
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
			
			String email = jwtProvider.getEmailFromToken(jwt);
			
			User user = userRepository.findByEmail(email);
			
			if(user == null) {
				throw new UserException("User not found with email - " + email);
			}
			
		return user;
	}

}
