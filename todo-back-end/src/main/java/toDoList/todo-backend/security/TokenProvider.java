package toDoList.demo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import toDoList.demo.model.User;
import io.jsonwebtoken.Jwts;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Service
public class TokenProvider {
    private static final String SECRET_KEY = "ASDLKJ#@*(&ASDLFKJ";


    public String create (User user){
        Date expiryDate = Date.from(
                Instant.now().plus(1, ChronoUnit.DAYS)
        );
        return Jwts.builder()
                .signWith( SignatureAlgorithm.HS512, SECRET_KEY )
                .setSubject(user.getId()) // sub
                .setIssuer("demo app") // iss
                .setIssuedAt(new Date()) // iat
                .setExpiration(expiryDate) // exp
                .compact();
    }
    public String validateAndGetUserId(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }
}

