package main

import (
	"fmt"
	"os"
	"push-swap/algorithme"
	"push-swap/helper"
	"time"
)

func main() {
	
	if(len(os.Args)!=2){
		fmt.Println("Usage: go run main.go <array of integers>")
				fmt.Println("examle: go run main.go \"3 0 1 2 23 34 2 45 67 89 12 11 10\"")
				os.Exit(0)


	}
	// Start timer
	numbers:=helper.FormatArgs(os.Args[1])
	

	start := time.Now()
	if (helper.IsSorted(&numbers)){
		fmt.Println("numbers are already sorted")
		return
	}
	pushSwap(&numbers)

	// End timer
	elapsed := time.Since(start)

	fmt.Println("Sorted array:", numbers)
	fmt.Printf("Execution time: %s\n", elapsed)
}


func pushSwap(numbers *[]int) {
	if(len(*numbers)==0 ){
		fmt.Println("exit no numbers")

	}
	if(len(*numbers)==1){
fmt.Println("numbers already sorted")
os.Exit(0)
	}
	if(len(*numbers)==2){
		fmt.Println("Sorting 2 numbers")
		algorithme.Swap2(numbers)
	}
	if(len(*numbers)==3){
		fmt.Println("Sorting 3 numbers")
		algorithme.Swap3(numbers)
	}
	if(len(*numbers)==4 || len(*numbers)==5){
		fmt.Println("Sorting 3 numbers")
		algorithme.HardSwap(numbers)
	}
	if(len(*numbers)>=6){
		fmt.Println("Sorting 3 numbers")
		algorithme.RadixSort(numbers)
	}



}