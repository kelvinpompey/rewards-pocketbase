package main

import (
	"log"
	"myapp/config"
	"myapp/handlers"
)

func main() {
    app := config.Init() 
		env := config.Env{PocketBase: app}
		handlers.Init(env)

    if err := app.Start(); err != nil {
        log.Fatal(err)
    }
}