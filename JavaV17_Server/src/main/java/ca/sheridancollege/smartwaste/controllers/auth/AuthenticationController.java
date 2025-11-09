package ca.sheridancollege.smartwaste.controllers.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.sheridancollege.smartwaste.models.AuthenticationRequest;
import ca.sheridancollege.smartwaste.models.AuthenticationResponse;
import ca.sheridancollege.smartwaste.services.AuthenticationService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthenticationController {
	private final AuthenticationService authenticationService;

	// map incoming POST requests to register a new user
	@PostMapping(value = "/register", consumes = "application/json")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request) {
		return ResponseEntity.ok(authenticationService.register(request));
	}

	// map incoming POST requests to authenticate an existing user
	@PostMapping(value = "/authenticate", consumes = "application/json")
	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
		return ResponseEntity.ok(authenticationService.authenticateAPI(request));
	}
}
