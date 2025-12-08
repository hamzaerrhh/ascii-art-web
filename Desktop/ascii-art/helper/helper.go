package helper

import (
	"os"
	"strings"
)

func LoadBanner(path string) (map[rune][]string, error) {
	content, err := os.ReadFile(path)
	if err != nil {
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
