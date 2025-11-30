package main

import (
	"fmt"
	"go_reloaded/processor"
	"os"
)

// Entry point
func main() {
	if len(os.Args) != 3 {
		fmt.Println("Usage: go run . <input_file> <output_file>")
		return
	}

	inputFile := os.Args[1]
	outputFile := os.Args[2]

	data, err := os.ReadFile(inputFile)
	if err != nil {
		fmt.Println("Error reading input file:", err)
		return
	}

	text := string(data)

	text = processor.ProcessFlags(text)

	text = processor.ProcessPunctuation(text)
	text = processor.ExtractAndCleanQuotes(text)

	text = processor.ProcessIndefiniteArticle(text)

	err = os.WriteFile(outputFile, []byte(text), 0644)
	if err != nil {
		fmt.Println("Error writing output file:", err)
		return
	}
}









