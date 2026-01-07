package algorithme

import (
	"fmt"
	"push-swap/funcSwap"
)

func Swap2(numbers *[]int) {
	//use SA algo
	fmt.Println("swap 2 numbers")
	funcSwap.Swap(numbers)
}
func Swap3(a *[]int) {
	first := (*a)[0]
	second := (*a)[1]
	third := (*a)[2]

	if first <= second && second <= third {
		return
	}

	if first > second && second <= third && first <= third {
		funcSwap.Sa(a)
	} else if first > second && second > third {
		funcSwap.Sa(a)
		funcSwap.Rra(a)
	} else if first > second && first > third && second <= third {
		funcSwap.Ra(a)
	} else if first <= second && first > third {
		funcSwap.Rra(a)
	} else if first <= second && second > third {
		funcSwap.Sa(a)
		funcSwap.Ra(a)
	}
}



func HardSwap(a *[]int) {
	b:=&[]int{}
	size := len(*a)

	if size == 4 {
		BringMinToTop(a)
		funcSwap.Pb(a, b)
		Swap3(a)
		funcSwap.Pa(a, b)
	}

	if size == 5 {
		BringMinToTop(a)
		funcSwap.Pb(a, b)

		// push second min
		BringMinToTop(a)
		funcSwap.Pb(a, b)

		Swap3(a)

		// ensure correct order in B
		if (*b)[0] < (*b)[1] {
			funcSwap.Sb(b)
		}

		funcSwap.Pa(a, b)
		funcSwap.Pa(a, b)
	}
}



func MinIndex(a []int) int {
	min := a[0]
	index := 0
	for i, v := range a {
		if v < min {
			min = v
			index = i
		}
	}
	return index
}

func BringMinToTop(a *[]int) {
	minIndex := MinIndex(*a)
	size := len(*a)

	if minIndex <= size/2 {
		for minIndex > 0 {
			funcSwap.Ra(a)
			minIndex--
		}
	} else {
		for minIndex < size {
			funcSwap.Rra(a)
			minIndex++
		}
	}
}
