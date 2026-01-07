package helper

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func FormatArgs(args string) []int {
	parts := strings.Split(args, " ")

	var numbers []int
	for _, s := range parts {
		num, err := strconv.Atoi(s)
		if err != nil {
			fmt.Println("Error: invalid integer:", s)
			os.Exit(0)
		}
		numbers = append(numbers, num)
	}
	return numbers
}
func IsSorted(numbers *[]int) bool {
    // Empty or single element slice is considered sorted
    if len(*numbers) <= 1 {
        return true
    }
    
    // Correct way to access elements: (*numbers)[i]
    for i := 0; i < len(*numbers)-1; i++ {
        if (*numbers)[i] > (*numbers)[i+1] {
            return false
        }
    }
    return true
}