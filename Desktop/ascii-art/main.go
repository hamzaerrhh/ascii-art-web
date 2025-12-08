package main

import (
	"fmt"
	"os"
	"strings"

	"ascii_art/helper"
)

func main() {
	if len(os.Args) != 2 {
		fmt.Println("----Usage : go run main.go arg----")
		return
	}

	text := os.Args[1]
	if !helper.Is_all(text) {
		fmt.Println("You Used caraters from out the ascii table !!")
		return
	}
	if helper.CheckNewLine(text) {
		fmt.Print(text)
		return
	}

	banner, err := helper.LoadBanner("standard.txt")
	if err != nil {
		fmt.Println("Error loading banner:", err)
		return
	}

	lines := strings.Split(text, "\\n")
	for _, line := range lines {

		if line == "" {
			fmt.Println("")
			continue
		}

		for row := 0; row < 8; row++ {
			for _, char := range line {
				fmt.Print(banner[char][row])
			}
			fmt.Println()
		}

	}
}
