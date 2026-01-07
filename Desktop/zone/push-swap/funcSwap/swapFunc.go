package funcSwap

import "fmt"

func Push(a, b *[]int) {
	if len(*b) == 0 {
		return
	}
	element := (*b)[0]
	*b = (*b)[1:]
	*a = append([]int{element}, *a...)
}

func Swap(a *[]int) {

	if len(*a) < 2 {
		return
	}
	(*a)[0], (*a)[1] = (*a)[1], (*a)[0]
}

func Rotate(a *[]int) {
	if len(*a) < 2 {
		return
	}
	first := (*a)[0]
	*a = append((*a)[1:], first)
}

func ReverseRotate(a *[]int) {
	if len(*a) < 2 {
		return
	}
	last := (*a)[len(*a)-1]
	*a = append([]int{last}, (*a)[:len(*a)-1]...)
}
func Pa(a, b *[]int) {
	fmt.Println("pa")
	Push(a, b)
}

// pb push the top first element of stack a to stack b
func Pb(a, b *[]int) {
	fmt.Println("pb")
	// Need to create opposite of Push (push from a to b)
	if len(*a) == 0 {
		return
	}
	element := (*a)[0]
	*a = (*a)[1:]
	*b = append([]int{element}, *b...)
}

// sa swap first 2 elements of stack a
func Sa(a *[]int) {
	fmt.Println("sa")
	Swap(a)
}

// sb swap first 2 elements of stack b
func Sb(b *[]int) {
	fmt.Println("sb")
	Swap(b)
}

// ss execute sa and sb
func Ss(a, b *[]int) {
	fmt.Println("ss")
	Sa(a)
	Sb(b)
}

// ra rotate stack a (shift up all elements of stack a by 1)
func Ra(a *[]int) {
	fmt.Println("ra")
	Rotate(a)
}

// rb rotate stack b
func Rb(b *[]int) {
	fmt.Println("rb")
	Rotate(b)
}

// rr execute ra and rb
func Rr(a, b *[]int) {
	fmt.Println("rr")
	Ra(a)
	Rb(b)
}

// rra reverse rotate a (shift down all elements of stack a by 1)
func Rra(a *[]int) {
	fmt.Println("rra")
	ReverseRotate(a)
}

// rrb reverse rotate b
func Rrb(b *[]int) {
	fmt.Println("rrb")
	ReverseRotate(b)
}

// rrr execute rra and rrb
func Rrr(a, b *[]int) {
	fmt.Println("rrr")
	Rra(a)
	Rrb(b)
}
