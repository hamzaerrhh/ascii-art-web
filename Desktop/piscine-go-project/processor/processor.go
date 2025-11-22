package processor

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
	"unicode"
)

// ProcessText applies all the required modifications to the input text
func ProcessText(text string) string {
text =processFlags(text)
if text !=processFlags(text){
	text =processFlags(text)
}

	text = formatPunctuation(text)
		fmt.Println("text after processing",text)

	text = formatQuotes(text)
	fmt.Println("text after processing",text)
	text = correctAtoAn(text)

	
	return strings.TrimSpace(text)
}
func processFlags(text string) string{

		text = processHexBin(text)
	text = processCaseModifiers(text)

return  text
}
// processHexBin handles (hex) and (bin) conversions
func processHexBin(text string) string {
	pattern := regexp.MustCompile(`(\S+)\s+\((hex|bin)\)`)
	
	return pattern.ReplaceAllStringFunc(text, func(match string) string {
		parts := pattern.FindStringSubmatch(match)
		if len(parts) != 3 {
			return match
		}
		
		word := parts[1]
		modType := parts[2]
		
		switch modType {
		case "hex":
			if value, err := strconv.ParseInt(word, 16, 64); err == nil {
				return fmt.Sprintf("%d", value)
			}
		case "bin":
			if value, err := strconv.ParseInt(word, 2, 64); err == nil {
				return fmt.Sprintf("%d", value)
			}
		}
		
		return match
	})
}

// processCaseModifiers handles (up), (low), (cap) with optional number parameters
func processCaseModifiers(text string) string {
	// Pattern for modifiers with optional number parameter
	pattern := regexp.MustCompile(`(?:(\S+)\s+)?\((up|low|cap)(?:,\s*(\d+))?\)`)
	
	for {
		match := pattern.FindStringSubmatch(text)
		if match == nil {
			break
		}
		
		var wordsToModify []string
		modType := match[2]
		count := 1
		
		// If a specific word is provided before the modifier
		if match[1] != "" {
			wordsToModify = []string{match[1]}
		} else if match[3] != "" {
			// If a count is specified, get the previous n words
			count, _ = strconv.Atoi(match[3])
			// Find the position of the match
			start := strings.Index(text, match[0])
			if start > 0 {
				// Get the text before the match
				before := text[:start]
				words := strings.Fields(before)
				if len(words) >= count {
					wordsToModify = words[len(words)-count:]
					// Remove these words from the original text
					replacementText := strings.Join(words[:len(words)-count], " ") + " "
					text = replacementText + text[start:]
				}
			}
		}
		
		if wordsToModify == nil {
			// Remove the modifier if no words to modify
			text = strings.Replace(text, match[0], "", 1)
			continue
		}
		
		// Apply the modification
		var modifiedWords []string
		for _, word := range wordsToModify {
			switch modType {
			case "up":
				modifiedWords = append(modifiedWords, strings.ToUpper(word))
			case "low":
				modifiedWords = append(modifiedWords, strings.ToLower(word))
			case "cap":
				modifiedWords = append(modifiedWords, capitalize(word))
			}
		}
		
		// Replace the match with modified words
		replacement := strings.Join(modifiedWords, " ")
		text = strings.Replace(text, match[0], replacement, 1)
	}
	
	return text
}

// capitalize capitalizes the first letter of a word
func capitalize(word string) string {
	if word == "" {
		return word
	}
	runes := []rune(word)
	runes[0] = unicode.ToUpper(runes[0])
	return string(runes)
}


func formatPunctuation(text string) string {
    // First, normalize spaces around all punctuation
    punctuationPattern := regexp.MustCompile(`\s*([.,!?:;])\s*`)
    text = punctuationPattern.ReplaceAllString(text, "$1 ")
    
    // Handle ellipsis and groups of punctuation
    // Fix cases like ". ." or ". .." by removing spaces between dots
    text = regexp.MustCompile(`\.\s*\.\s*\.`).ReplaceAllString(text, "...")
    text = regexp.MustCompile(`\.\s*\.`).ReplaceAllString(text, "..")
    
    // Handle other punctuation groups (like !?, etc.)
    groupPunctuationPattern := regexp.MustCompile(`([.,!?:;])\s+([.,!?:;])`)
    for groupPunctuationPattern.MatchString(text) {
        text = groupPunctuationPattern.ReplaceAllString(text, "$1$2")
    }
    
    // Ensure space after punctuation when it's not followed by another punctuation or quote
    text = regexp.MustCompile(`([.,!?:;])([^\s.,!?:;'"])`).ReplaceAllString(text, "$1 $2")
    
    return text
}





func correctAtoAn(text string) string {
	// Pattern to match "a" followed by a word starting with vowel or h
	pattern := regexp.MustCompile(`\b(a)\s+([aeiouhAEIOUH][a-z]*)`)
	
	return pattern.ReplaceAllStringFunc(text, func(match string) string {
		parts := pattern.FindStringSubmatch(match)
		if len(parts) == 3 {
			return "an " + parts[2]
		}
		return match
	})
}

