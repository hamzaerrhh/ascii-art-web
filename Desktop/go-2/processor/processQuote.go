package processor

import (
	"regexp"
	"strings"
)



var quoteRegex = regexp.MustCompile(`'((?:[^']|'\pL|\pL')*)'(?:\s|$)`)


func ExtractAndCleanQuotes(text string) string {
	matches := quoteRegex.FindAllStringSubmatch(text, -1)

	if len(matches) == 0 {
		return text
	}
	
	result := text
	for _, match := range matches {
		if len(match) > 1 {
			fullMatch := match[0]    // The full match including quotes: ' ffff '
			innerText := match[1]    // The inner text: ffff
			trimmed := strings.TrimSpace(innerText) // Trimmed inner text: ffff
			
			// Replace the original with quotes + trimmed content
			cleaned := "'" + trimmed + "'"
			result = strings.Replace(result, fullMatch, cleaned, 1)
		}
	}
	
	return result
}
