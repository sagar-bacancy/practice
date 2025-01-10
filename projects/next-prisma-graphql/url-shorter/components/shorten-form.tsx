"use client"

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function ShortenForm() {

  const [url, setUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({url})
      })
      await response.json()
      setUrl("")
    } catch (error) {
      console.error(error)
    } finally {
    setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value || "")

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Input value={url} onChange={handleChange} className="h-12" type="url" placeholder="Enter URL to shorten" required />
        <Button className="w-full p-2 disabled:cursor-not-allowed" type="submit" disabled={isLoading}>
          {isLoading ? "Shortening..." : "Shorten URL"}
        </Button>
      </div>
    </form>
  );
}
