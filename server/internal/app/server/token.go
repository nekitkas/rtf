package server

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"
	"time"
)

var jwtSecretKey = "jwt_secret_key"

type CustomClaims struct {
	UserID string `json:"user_id"`
	Exp    int64  `json:"exp"`
}

// Helper function to generate a JWT token
func (s *server) generateToken(id string, expiration time.Time) (string, error) {
	claims := CustomClaims{
		UserID: id,
		Exp:    expiration.Unix(),
	}

	// Encode the header and claims
	headerBytes, _ := json.Marshal(map[string]interface{}{
		"alg": "HS256",
		"typ": "JWT",
	})

	claimsBytes, _ := json.Marshal(claims)

	// Create the signature
	hash := hmac.New(sha256.New, []byte(jwtSecretKey))
	hash.Write(append(append(headerBytes, '.'), claimsBytes...))
	signature := hash.Sum(nil)

	// Encode the signature
	signatureString := base64.RawURLEncoding.EncodeToString(signature)

	// Construct the final JWT token
	token := fmt.Sprintf("%s.%s.%s", base64.RawURLEncoding.EncodeToString(headerBytes), base64.RawURLEncoding.EncodeToString(claimsBytes), signatureString)

	return token, nil
}

func extractToken(authorizationHeader string) string {
	parts := strings.Split(authorizationHeader, " ")
	if len(parts) == 2 {
		return parts[1]
	}
	return ""
}

// Helper function to parse the JWT token
func parseToken(tokenString string) (*CustomClaims, error) {
	parts := strings.Split(tokenString, ".")
	if len(parts) != 3 {
		return nil, fmt.Errorf("invalid token format")
	}

	// Decode and parse the header
	header, err := base64.RawURLEncoding.DecodeString(parts[0])
	if err != nil {
		return nil, fmt.Errorf("failed to decode header: %v", err)
	}

	// Decode and parse the claims
	claimsData, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil {
		return nil, fmt.Errorf("failed to decode claims: %v", err)
	}

	var claims CustomClaims
	if err := json.Unmarshal(claimsData, &claims); err != nil {
		return nil, fmt.Errorf("failed to unmarshal claims: %v", err)
	}

	// Verify the algorithm
	var headerMap map[string]interface{}
	if err := json.Unmarshal(header, &headerMap); err != nil {
		return nil, fmt.Errorf("failed to unmarshal header: %v", err)
	}

	algorithm, ok := headerMap["alg"].(string)
	if !ok {
		return nil, fmt.Errorf("invalid algorithm in header")
	}

	if algorithm != "HS256" {
		return nil, fmt.Errorf("unsupported algorithm: %s", algorithm)
	}

	// Verify the signature
	signature, err := base64.RawURLEncoding.DecodeString(parts[2])
	if err != nil {
		return nil, fmt.Errorf("failed to decode signature: %v", err)
	}

	hash := hmac.New(sha256.New, []byte(jwtSecretKey))
	hash.Write(append(append(header, '.'), claimsData...))

	if !hmac.Equal(signature, hash.Sum(nil)) {
		return nil, fmt.Errorf("invalid signature")
	}

	return &claims, nil
}
