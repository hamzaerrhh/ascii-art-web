package helper

import (
	"fmt"
	"strings"
)

// MainHelper generates ASCII art and returns it as a string
func MainHelper(text, bannerTitle string) (string, error) {
	// Handle empty text
	if text == "" {
		return "", nil
	}
	
	// Check for newline-only text
	if CheckNewLine(text) {
		return text, nil
	}
	
	// Validate text contains only printable ASCII characters
	if !Is_all(text) {
		return "", &InvalidCharacterError{text}
	}
	
	// Determine which banner file to use
	var bannerFile string
	switch bannerTitle {
	case "shadow":
		bannerFile = "./shadow.txt"
	case "standard":
		bannerFile = "./standard.txt"
	case "thinkertoy":
		bannerFile = "./thinkertoy.txt"
	default:
		return "", &InvalidBannerError{bannerTitle}
	}
	
	// Load the banner
	fmt.Println("banner file is",bannerFile)
	banner, err := LoadBanner(bannerFile)
	fmt.Println("banner is",banner[2])
	if err != nil {
		return "", err
	}
	
	// Generate ASCII art
	var result strings.Builder
	lines := strings.Split(text, "\\n")
	
	for i, line := range lines {
		if line == "" {
			// Empty line means just add a newline
			result.WriteString("\n")
			continue
		}
		
		// Process each row (8 rows per character)
		for row := 0; row < 8; row++ {
			for _, char := range line {
				// Get the ASCII art for this character and row
				if asciiArt, ok := banner[char]; ok && row < len(asciiArt) {
					result.WriteString(asciiArt[row])
				} else {
					// If character not found, use space
					result.WriteString("      ")
				}
			}
			result.WriteString("\n")
		}
		
		// Don't add extra newline after the last line
		if i < len(lines)-1 && lines[i+1] != "" {
			result.WriteString("\n")
		}
	}
	
	return result.String(), nil
}



// Custom error types
type InvalidBannerError struct {
	Banner string
}

func (e *InvalidBannerError) Error() string {
	return "invalid banner: " + e.Banner
}

type InvalidCharacterError struct {
	Text string
}

func (e *InvalidCharacterError) Error() string {
	return "text contains invalid characters: " + e.Text
}