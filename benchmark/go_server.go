// Minimale HTTP server in Go met Fiber.
package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/api/hello", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "Hello, World!"})
	})

	app.Get("/api/data", func(c *fiber.Ctx) error {
		data := make([]fiber.Map, 100)
		for i := range 100 {
			data[i] = fiber.Map{"id": i, "value": "item_" + strconv.Itoa(i)}
		}
		return c.JSON(data)
	})

	fmt.Println("Go/Fiber server op http://0.0.0.0:8081")
	http.ListenAndServe(":8081", app.Handler())
}
