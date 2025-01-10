"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Check, CopyIcon, EyeIcon } from "lucide-react";

interface Url {
  id: string
  originalUrl: string
  shortCode: string
  createdAt: Date
  visits: number
}

export default function UrlList() {

  const [urls, setUrls] = useState<Array<Url>>([])
  const [copied, setCopied] = useState<{
    [key:string]: boolean
  }>({})

  const fetchUrls = async () => {
    try {
      const response = await fetch("/api/urls")
      const data = await response.json()
      console.table({data});
      setUrls(data)
      } catch (error) {
        console.error(error)
      }
  }

  const shortenerUrl = (shortCode: string) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`
  }

  const handleCopyUrl = (code: string) => () => {
    const fullUrl = shortenerUrl(code)
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied((prev) => ({
        ...prev,
        [code]: true}))
    })
    setTimeout(() => {
      setCopied((prev) => ({
        ...prev,
        [code]: false
      }))
    }, 3000)
  }

  useEffect(() => {
    fetchUrls()
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Recent URLs</h2>
      <ul className="space-y-2">
        {urls.map((url: Url) => (
          <li className="flex items-center gap-2 justify-between bg-card rounded-md text-card-foreground border p-3" key={url?.id}>
          <Link href={`/${url?.shortCode}`} className="text-blue-600 hover:underline" target="_blank">
            {shortenerUrl(url?.shortCode)}
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted" onClick={handleCopyUrl(url?.shortCode)}>
              {copied[url?.shortCode] ?
                <Check className="w-4 h-4" />
               : 
                <CopyIcon className="w-4 h-4" />
              }
              <span className="sr-only">Copy URL</span>
            </Button>
            <span className="flex items-center gap-2">
              <EyeIcon className="h-4 w-4" />
              {url?.visits} views
            </span>
          </div>
        </li>
        ))}
      </ul>
    </div>
  )
}
