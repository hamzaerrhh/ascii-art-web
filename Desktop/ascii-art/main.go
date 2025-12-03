package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	if len(os.Args) != 2 {
		return
	}

text := os.Args[1]

// Convert literal "\n" into a real newline
text = strings.ReplaceAll(text, "\\n", "\n")

	// Load banner font
	banner, err := loadBanner("standard.txt")
	if err != nil {
		fmt.Println("Error loading banner:", err)
		return
	}

	// Split by real newline characters
	lines := strings.Split(text, "\n")

for idx, line := range lines {
   // Empty line handling: print only ONE blank line even if there are several ""
if line == "" {
    // Only print blank line if previous line was NOT blank
    if idx == 0 || lines[idx-1] != "" {
        fmt.Println()
    }
    continue
}


    // Normal rendering of ASCII art
    for row := 0; row < 8; row++ {
        for _, char := range line {
            if char < 32 || char > 126 {
                continue
            }
            fmt.Print(banner[char][row])
        }
        fmt.Println()
    }

    // Print empty line only if next line is non-empty
    if idx < len(lines)-1 && lines[idx+1] != "" {
        fmt.Println()
    }
}

}

func loadBanner(path string) (map[rune][]string, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	banner := make(map[rune][]string)

	char := rune(32)
	for {
		var block []string
		for i := 0; i < 8; i++ {
			if !scanner.Scan() {
				return banner, nil
			}
			block = append(block, scanner.Text())
		}
		banner[char] = block
		char++

		if !scanner.Scan() { // skip empty line
			break
		}
	}

	return banner, nil
}
