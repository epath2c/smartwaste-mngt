package ca.sheridancollege.smartwaste.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ca.sheridancollege.smartwaste.beans.Role;
import ca.sheridancollege.smartwaste.beans.User;
import ca.sheridancollege.smartwaste.models.AuthenticationRequest;
import ca.sheridancollege.smartwaste.models.AuthenticationResponse;
import ca.sheridancollege.smartwaste.repositories.UserRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthenticationService {
	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	private JWTService jwtService;
	private AuthenticationManager authenticationManager;

	// a method to register a new user in our database, and generate a JWT for them
	public AuthenticationResponse register(AuthenticationRequest request) {
		User user = User.builder().email(request.getEmail()).password(passwordEncoder.encode(request.getPassword()))
				.role(Role.USER).build();
		userRepository.save(user);
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder().token(jwtToken).build();
	}

	// a method to authenticate an existing user and generate a JWT for them
	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder().token(jwtToken).build();
	}
}
