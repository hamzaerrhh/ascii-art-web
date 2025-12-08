package helper

import (
	"fmt"
	"os"
	"strings"
)

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

func LoadBanner(path string) (map[rune][]string, error) {
	content, err := os.ReadFile(path)
	if err != nil {
		fmt.Println("can't open read err", err)
		return nil, err
	}

	lines := strings.Split(string(content), "\n")

	// skip the first empty line (same as loadBannerV1)
	if len(lines) > 0 && lines[0] == "" {
		lines = lines[1:]
	}

	banner := make(map[rune][]string)
	char := rune(32)

	var block []string
	for _, line := range lines {
		// empty line means block is complete
		if line == "" {
			if len(block) == 8 {
				banner[char] = block
				char++
			}
			block = []string{}
			continue
		}

		block = append(block, line)
	}

	// catch last block if file doesn't end with newline
	if len(block) == 8 {
		banner[char] = block
	}

	return banner, nil
}

func CheckNewLine(text string) bool {
	for _, char := range text {
		if char != '\n' {
			return false
		}
	}
	return true
}

func Is_all(s string) bool {
	for _, v := range s {
		if v < 32 || v > 126 {
			return false
		}
	}
	return true
}

// MainHelper generates ASCII art and returns it as a string
func MainHelper(text, bannerTitle string) (string, error) {
	// Handle empty text
	if text == "" {
		return "", nil
	}

	if CheckNewLine(text) {
		return text, nil
	}

	if !Is_all(text) {
		return "", &InvalidCharacterError{text}
	}

	// Determine which banner file to use
	var bannerFile string
	switch bannerTitle {
	case "shadow":
		bannerFile = "shadow.txt"
	case "standard":
		bannerFile = "standard.txt"
	case "thinkertoy":
		bannerFile = "thinkertoy.txt"
	default:
		return "", &InvalidBannerError{bannerTitle}
	}

	// Load the banner
	fmt.Println("banner file is", bannerFile)
	banner, err := LoadBanner(bannerFile)
	if err != nil {
		// Try with helper/ path
		bannerFile = "helper/" + bannerFile
		fmt.Println("trying alternative path:", bannerFile)
		banner, err = LoadBanner(bannerFile)
		if err != nil {
			return "", fmt.Errorf("could not load banner file: %v", err)
		}
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