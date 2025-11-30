package processor

import (
	"regexp"
	"strings"
)

func ProcessPunctuation(text string) string {
	// 1️⃣ Preserve ... and !? sequences (remove spaces inside)
	text = regexp.MustCompile(`(\.\.\.|!\?)`).ReplaceAllStringFunc(text, func(m string) string {
		return strings.ReplaceAll(m, " ", "")
	})

	// 2️⃣ Remove space before normal punctuation (except ... and !?)
	text = regexp.MustCompile(`\s+([.,!?;:])`).ReplaceAllString(text, "$1")

	// 3️⃣ Ensure at least one space after punctuation if followed by a word character
	text = regexp.MustCompile(`([.,!?;:])([^\s.,!?;:]|\n)`).ReplaceAllString(text, "$1 $2")

	// 4️⃣ Trim leading/trailing spaces
	text = strings.TrimSpace(text)

	return text
}