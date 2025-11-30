package processor

import (
	"regexp"
	"strings"
)

// ProcessIndefiniteArticle changes "a" to "an" or "A" to "AN" when followed by a word starting with vowel or 'h'
func ProcessIndefiniteArticle(text string) string {
	// Split into words and spaces
	words := regexp.MustCompile(`(\s+|\S+)`).FindAllString(text, -1)

	for i := 0; i < len(words)-1; i++ {
		currentWord := words[i]
		
		// Check if this word is exactly "a" or "A" (not part of another word)
		if currentWord == "a" || currentWord == "A" {
			// Find the next non-space word
			for j := i + 1; j < len(words); j++ {
				if strings.TrimSpace(words[j]) != "" && !isSpace(words[j]) {
					nextWord := words[j]
					if startsWithVowelOrH(nextWord) {
						// Change "a" to "an" or "A" to "AN"
						if currentWord == "A" {
							words[i] = "AN"
						} else {
							words[i] = "an"
						}
					}
					break
				}
			}
		}
	}

	return strings.Join(words, "")
}

// isSpace checks if a string contains only whitespace
func isSpace(s string) bool {
	return strings.TrimSpace(s) == ""
}

// startsWithVowelOrH checks if a word starts with a vowel or 'h' (any 'h')
func startsWithVowelOrH(s string) bool {
	if len(s) == 0 {
		return false
	}
	
	// Find the first alphabetic character in the word
	for _, char := range s {
		if (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') {
			firstChar := strings.ToLower(string(char))
			return firstChar == "a" || firstChar == "e" || firstChar == "i" || firstChar == "o" || firstChar == "u" || firstChar == "h"
		}
	}
	
	return false
}