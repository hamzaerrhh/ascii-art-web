package algorithme

import (
	"push-swap/funcSwap"
	"sort"
)

// Function to get the max number of bits needed
func RadixSort(a *[]int) {
	b := []int{}

	size := len(*a)
	max := getMax(*a)
	maxBits := 0

	// find how many bits we need
	for (max >> maxBits) != 0 {
		maxBits++
	}

	for bit := 0; bit < maxBits; bit++ {
		for i := 0; i < size; i++ {
			num := (*a)[0]

			if ((num >> bit) & 1) == 1 {
				funcSwap.Ra(a)
			} else {
				funcSwap.Pb(a, &b)
			}
		}

		// push everything back to A
		for len(b) > 0 {
			funcSwap.Pa(a, &b)
		}
	}
}

// convert values to ranks: smallest → 0, next → 1, etc.
func IndexArray(arr *[]int) {
	sorted := make([]int, len(*arr))
	copy(sorted, *arr)

	sort.Ints(sorted)

	for i, v := range *arr {
		for j, sv := range sorted {
			if v == sv {
				(*arr)[i] = j
				break
			}
		}
	}
}

func getMax(arr []int) int {
	max := arr[0]
	for _, v := range arr {
		if v > max {
			max = v
		}
	}
	return max
}
