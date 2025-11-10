package ca.sheridancollege.smartwaste.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import ca.sheridancollege.smartwaste.services.JwtAuthenticationFilter;
import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	private AuthenticationProvider authenticationProvider;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
				.csrf(csrf -> csrf.disable())	 // Disable CSRF for stateless REST API
				.cors(Customizer.withDefaults()) // Enable CORS
				.authorizeHttpRequests(
						authorize -> authorize		
						.requestMatchers(
						        "/", 
						        "/index.html", 
						        "/assets/**", 
						        "/favicon.ico", 
						        "/login", 
						        "/register", 
						        "/*.js", 
						        "/*.css", 
						        "/*.png", 
						        "/*.jpg"	
						    ).permitAll()
					.requestMatchers("/api/auth/**").permitAll()
					.requestMatchers(HttpMethod.GET, "/api/trashbins/**").permitAll()
					.anyRequest().authenticated()
				)
				.sessionManagement(
						session -> session
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				)
				.authenticationProvider(authenticationProvider)
				.addFilterBefore(
						jwtAuthenticationFilter,
						UsernamePasswordAuthenticationFilter.class
				)
				.build();
	}
	// CORS configuration for Angular frontend
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
    	CorsConfiguration config = new CorsConfiguration();
    	// Allowed frontend origins
        config.setAllowedOrigins(List.of(
                "http://localhost",     // Nginx default on local machine
                "http://127.0.0.1"
                // "http://<your-pi-ip>" add this when deploying to Pi
        ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);  // important for cookies / JWT if needed
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        source.registerCorsConfiguration("/**", config);
        return source;
    }
	
}
