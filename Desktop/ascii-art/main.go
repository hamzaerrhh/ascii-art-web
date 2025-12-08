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
		fmt.Println("the text is",text)
		fmt.Println("the banner is ",banner)

        // Validate input
        if text == "" {
            data.Error = "Please enter some text"
            data.Text = text
            data.Banner = banner
        } else {
            validBanners := map[string]bool{
                "standard":   true,
                "shadow":     true,
                "thinkertoy": true,
            }

            if !validBanners[banner] {
                data.Error = "Invalid banner selection"
                data.Text = text
                data.Banner = "standard"
            } else {


                // Generate ASCII art
                result, err := helper.MainHelper(text, banner)
				fmt.Println("text res is",result)
                if err != nil {

                    log.Printf("Error generating ASCII art: %v", err)
                    data.Error = "Failed to generate ASCII art"
                    data.Text = text
                    data.Banner = banner
                } else {
                    data.Text = text
                    data.Banner = banner
                    data.Content = result
                }
            }
        }
    }

    // Render template with data
    renderTemplate(w, data)
}

func generateAsciiArt(text, banner string) (string, error) {
    // This is a simulation - replace with your actual ASCII art logic
    var result string
    
    switch banner {
    case "standard":
        result = `
╔═══════════════════════════════════════╗
║          ASCII ART - STANDARD         ║
╠═══════════════════════════════════════╣
║  Text: ` + text + `
║                                       ║
║  Example:                            ║
║    _    _      _ _        __         ║
║   | |  | |    | | |      / _|        ║
║   | |__| | ___| | | ___ | |_         ║
║   |  __  |/ _ \ | |/ _ \|  _|        ║
║   | |  | |  __/ | | (_) | |          ║
║   |_|  |_|\___|_|_|\___/|_|          ║
╚═══════════════════════════════════════╝
`
    case "shadow":
        result = `
██████████████████████████████████████████████
███████████████  ASCII ART - SHADOW  █████████
██████████████████████████████████████████████

      Text: ` + text + `

      ███╗   ██╗███████╗██╗  ██╗
     ████║   ██║██╔════╝██║  ██║
     ██╔██╗  ██║███████╗███████║
     ██║╚██╗██║╚════██║██╔══██║
     ██║ ╚████║███████║██║  ██║
     ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
`
    case "thinkertoy":
        result = `
+++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++ ASCII ART - THINKERTOY ++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++

Text: ` + text + `

    ooooo   oooo       .o8        .o8
     '888. .8'        "888       "888
       '888.8'    .oooo888   .oooo888
        '888'    d88' '888  d88' '888
         888     888   888  888   888
         888     888   888  888   888
        o888o    'Y8bod88P' 'Y8bod88P'
`
    default:
        result = "Error: Unknown banner style"
    }
    
    return result, nil
}

func renderTemplate(w http.ResponseWriter, data PageData) {
    err := tmpl.Execute(w, data)
    if err != nil {
        log.Printf("Template error: %v", err)
        http.Error(w, "500 Internal Server Error", http.StatusInternalServerError)
    }
}