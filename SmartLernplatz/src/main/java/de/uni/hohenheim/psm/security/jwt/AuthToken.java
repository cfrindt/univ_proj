package de.uni.hohenheim.psm.security.jwt;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class AuthToken extends UsernamePasswordAuthenticationToken {

    private final long userId;

    public AuthToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities, Long userId) {
        super(principal, credentials, authorities);
        this.userId = userId;
    }

    public AuthToken(Object principal, Object credentials, Long userId) {
        super(principal, credentials);
        this.userId = userId;
    }
    public Long getUserId(){
        return this.userId;
    }
}
