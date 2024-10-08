package config

import (
	"github.com/pocketbase/pocketbase"
)

type Env struct {
	PocketBase *pocketbase.PocketBase
}

func Init() *pocketbase.PocketBase {
	app := pocketbase.New()

	return app 

}