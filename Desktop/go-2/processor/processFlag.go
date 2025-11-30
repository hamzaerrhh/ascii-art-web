package processor

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

func ProcessFlags(text string) string {
	parts := SplitFlags(text)
	fmt.Printf("Initial parts: %#v\n", parts)
	
	flagPattern := regexp.MustCompile(`^\((cap|low|up|bin|hex)\)$`)
	flagNpattern := regexp.MustCompile(`^\((cap|low|up|bin|hex)(?:,\s*(\d+))?\)$`)

	for i := 0; i < len(parts); i++ {
		fmt.Printf("Checking part %d: '%s'\n", i, parts[i])

		part := strings.TrimSpace(parts[i])
		match := flagPattern.FindStringSubmatch(part)
		matchN := flagNpattern.FindStringSubmatch(part)
		
		if match == nil && matchN == nil {
			continue
		}

		var flag string
		n := 1

		if matchN != nil {
			flag = matchN[1]
			if matchN[2] != "" {
				num, err := strconv.Atoi(matchN[2])
				if err == nil && num > 0 {
					n = num
				}
			}
		} else if match != nil {
			flag = match[1]
		} else {
			continue
		}

		fmt.Printf("Found flag: %s, n=%d\n", flag, n)
		
		wordCount := 0
		for j := i - 1; j >= 0 && wordCount < n; j-- { 
			fmt.Printf("  Checking previous part %d: '%s' (trimmed: '%s')\n", j, parts[j], strings.TrimSpace(parts[j]))
			
			// Skip if it's a space token or another flag
			if strings.TrimSpace(parts[j]) == "" {
				fmt.Printf("  Skipping - it's a space token\n")
				continue
			}
			if flagPattern.MatchString(parts[j]) || flagNpattern.MatchString(parts[j]) {
				fmt.Printf("  Skipping - it's another flag\n")
				continue
			}

			
			word := parts[j]
			switch flag {
			case "hex":
				if v, err := strconv.ParseInt(word, 16, 64); err == nil {
					word = strconv.FormatInt(v, 10)
				}
			case "bin":
				if v, err := strconv.ParseInt(word, 2, 64); err == nil {
					word = strconv.FormatInt(v, 10)
				}
			case "up":
				word = strings.ToUpper(word)
			case "low":
				word = strings.ToLower(word)
			case "cap":
				word = capitalize(word)
			}
			
// If flag is surrounded by two spaces → remove ONE of them
if i > 0 && i < len(parts)-1 {
	isSpaceBefore := strings.TrimSpace(parts[i-1]) == ""
	isSpaceAfter := strings.TrimSpace(parts[i+1]) == ""

	if isSpaceBefore && isSpaceAfter {
		parts[i-1] = "" // remove the leading space to avoid "word  next"
	}
}

			parts[j] = word
			fmt.Printf("  Changed to: '%s'\n", parts[j])
			wordCount++
			fmt.Printf("  wordCount now: %d\n", wordCount)
		}

		fmt.Printf("Removing flag at position %d\n", i)
		parts[i] = ""
		
		fmt.Printf("Current state: %#v\n", parts)
	}

	result := strings.Join(parts, "")
	fmt.Printf("Final result: '%s'\n", result)
	return result
}