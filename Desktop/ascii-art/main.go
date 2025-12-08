package main

import (
	"ascii_art_web/helper"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"strings"
)

type PageData struct {
    Title   string
    Text    string
    Banner  string
    Content string
    Error   string
}

var tmpl *template.Template

func main() {
    var err error
    tmpl, err = template.ParseFiles("templates/index.html")
    if err != nil {
        log.Fatal("Error loading template:", err)
    }

    // Handle both GET and POST on root path
    http.HandleFunc("/", homeHandler)

    log.Println("Server starting on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
    if r.URL.Path != "/" {
        http.Error(w, "404 Not Found", http.StatusNotFound)
        return
    }

    // Initialize default data
    data := PageData{
        Title:  "ASCII Art Generator",
        Banner: "standard", // Default banner
    }

    // Handle POST request (form submission)
    if r.Method == "POST" {
        err := r.ParseForm()
        if err != nil {
            http.Error(w, "400 Bad Request", http.StatusBadRequest)
            return
        }

        text := strings.TrimSpace(r.FormValue("text"))
        banner := r.FormValue("banner")
		fmt.Println("the text is", text)
		fmt.Println("the banner is ", banner)

        // Validate input
        if text == "" {
            data.Error = "Please enter some text"
            data.Text = text
            data.Banner = banner
        } else {
            result, err := helper.MainHelper(text, banner)
            if err != nil {
                log.Printf("Error generating ASCII art: %v", err)
                data.Error = "Failed to generate ASCII art: " + err.Error()
                data.Text = text
                data.Banner = banner
            } else {
                data.Text = text
                data.Banner = banner
                data.Content = result
            }
        }
    }

    // Render template with data
    renderTemplate(w, data)
}

func renderTemplate(w http.ResponseWriter, data PageData) {
    err := tmpl.Execute(w, data)
    if err != nil {
        log.Printf("Template error: %v", err)
        http.Error(w, "500 Internal Server Error", http.StatusInternalServerError)
    }
}