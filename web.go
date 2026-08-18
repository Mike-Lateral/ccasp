package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"
)

func doError(err error) {
	if nil == err {
		return
	}
	fmt.Fprintln(os.Stderr, err.Error())
	os.Exit(1)
}

func main() {
	port := flag.String(`port`, `26081`, `Port to run webserver`)
	flag.Parse()
	http.Handle(`/`, http.FileServer(http.Dir(`.`)))
	fmt.Printf("Serving on http://localhost:%s\n", *port)
	doError(http.ListenAndServe(":"+*port, nil))
}
