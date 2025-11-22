package processor

import (
	"strings"
	"unicode"
)

func formatQuotes(s string) string {
	var result strings.Builder
	runes := []rune(s)
	n := len(runes)

	state := 0
	quoteStartIdx := -1      
	contentBuffer := []rune{} 

	isSpace := func(r rune) bool {
		return unicode.IsSpace(r)
	}

	for i := 0; i < n; i++ {
		r := runes[i]

		switch state {
		case 0: // Outside of any quote
			if r == '\'' {
				if i == 0 || isSpace(runes[i-1]) {
					state = 1 // Potential opening quote found
					quoteStartIdx = i
					// Do NOT write the opening quote yet; we only write it if the segment closes validly.
				} else {
					// Quote inside a word (e.g., "don't"). Write as a regular character.
					result.WriteRune(r)
				}
			} else {
				result.WriteRune(r)
			}

		case 1: 
			if r == '\'' {
				
				if i == n-1 || isSpace(runes[i+1]) {
				
					result.WriteRune('\'') // Opening quote
					result.WriteRune('\'') // Closing quote
					state = 0
					contentBuffer = nil
				} else {
					contentBuffer = append(contentBuffer, r)
					state = 2
				}
			} else {
				contentBuffer = append(contentBuffer, r)
				state = 2 // Move to state 2 to track the content buffer
			}

		case 2: 
			if r == '\'' {
				
				if i == n-1 || isSpace(runes[i+1]) {
					
					contentStr := strings.TrimSpace(string(contentBuffer))
					
				
					result.WriteRune('\'') 
					
					// Write the trimmed content
					result.WriteString(contentStr)
					
					// Write the closing quote
					result.WriteRune(r)
					
					// Reset state
					state = 0
					quoteStartIdx = -1
					contentBuffer = nil
					
				} else {
					// Closing quote inside a word (e.g., 'I'm awesome'). Treat as part of content.
					contentBuffer = append(contentBuffer, r)
				}
			} else {
				// Regular content character (including internal spaces)
				contentBuffer = append(contentBuffer, r)
			}
		}
	}
	
	// Final check for an unclosed quote:
	if state == 1 || state == 2 {
		// If the quote segment was unclosed, we revert the text to the state before 
		// the unclosed segment started. This means writing the opening quote and all
		// the buffered content as literal text (without trimming).
		result.WriteRune('\'') // Write the unwritten opening quote
		result.WriteRune(runes[quoteStartIdx])
		result.WriteString(string(contentBuffer))
	}

	return result.String()
}