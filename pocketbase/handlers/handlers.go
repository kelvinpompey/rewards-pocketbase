package handlers

import (
	"log"
	"myapp/config"
	"os"

	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func Init (env config.Env) {

	// serves static files from the provided public dir (if exists)
	env.PocketBase.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS("../pb_public"), false))
		return nil
	})

	env.PocketBase.OnBeforeBootstrap().Add(func(e *core.BootstrapEvent) error {			
		log.Println("isDev: ", e.App.IsDev())
		log.Println("OnBefore Bootstrap")
		return nil
	})		


}