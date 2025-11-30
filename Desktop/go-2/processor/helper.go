package processor

import (
	"regexp"
	"strings"
)



func SplitFlags(text string) []string {
	// Match modifiers, words, or sequences of whitespace (spaces/newlines)
	tokens := regexp.MustCompile(`(\([^()]+\)|[^\s]+|\s+)`).FindAllString(text, -1)

	var result []string

	for _, token := range tokens {
		if strings.TrimSpace(token) == "" {
			// It's a whitespace token, preserve as-is
			result = append(result, token)
		} else {
			// Non-whitespace token (word or modifier)
			result = append(result, token)
		}
	}

	return result
}


func capitalize(s string) string {
	if len(s) == 0 {
		return s
	}
	return strings.ToUpper(s[:1]) + strings.ToLower(s[1:])
}
